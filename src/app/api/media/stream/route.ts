import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand, NoSuchKey } from "@aws-sdk/client-s3";
import { guard, jsonError, requireApiMember } from "@/lib/api/http";
import { r2Config, publicSupabaseConfig } from "@/lib/env";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/db";

// GET /api/media/stream?key=<storageKey>
// Proxies R2 objects through the Next.js server so the browser never makes a
// direct TLS connection to *.r2.dev (which requires public-access to be enabled
// in the Cloudflare dashboard and can hit cipher-mismatch errors).
export async function GET(request: NextRequest) {
  return guard(async () => {
    const urlObj = new URL(request.url);
    const token = urlObj.searchParams.get("token");
    const workspaceId = urlObj.searchParams.get("workspaceId");

    let auth: Awaited<ReturnType<typeof requireApiMember>>;
    if (token) {
      const { url, anonKey } = publicSupabaseConfig();
      const supabase = createServerClient<Database>(url, anonKey, {
        global: { headers: { Authorization: `Bearer ${token}` } },
        cookies: { getAll: () => [], setAll: () => {} },
      });
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return jsonError("Unauthorized", 401);
      }
      let membershipQuery = supabase.from("workspace_members").select("*").eq("user_id", user.id).eq("status", "active");
      if (workspaceId) {
        membershipQuery = membershipQuery.eq("workspace_id", workspaceId);
      }
      const { data: memberships } = await membershipQuery;
      const membership = memberships?.[0];
      if (!membership) {
        return jsonError("No active workspace membership", 403);
      }
      auth = { ok: true, user, membership };
    } else {
      auth = await requireApiMember();
    }
    if (!auth.ok) return auth.response;

    const key = new URL(request.url).searchParams.get("key") ?? "";
    if (!key || key.includes("..") || key.startsWith("/")) {
      return jsonError("Invalid key", 400);
    }

    const { accountId, accessKeyId, secretAccessKey, bucket } = r2Config();
    const s3 = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });

    const range = request.headers.get("range");
    const getParams: any = { Bucket: bucket, Key: key };
    if (range) {
      getParams.Range = range;
    }

    let obj;
    try {
      obj = await s3.send(new GetObjectCommand(getParams));
    } catch (err) {
      if (err instanceof NoSuchKey) return jsonError("Media not found", 404);
      throw err;
    }

    if (!obj.Body) return jsonError("Media not found", 404);

    const stream = (obj.Body as any).transformToWebStream();

    const headers: Record<string, string> = {
      "Content-Type": obj.ContentType ?? "video/mp4",
      "Cache-Control": "private, max-age=3600",
      "Accept-Ranges": "bytes",
    };

    if (obj.ContentLength != null) {
      headers["Content-Length"] = String(obj.ContentLength);
    }
    if (obj.ContentRange) {
      headers["Content-Range"] = obj.ContentRange;
    }

    return new NextResponse(stream, {
      status: range ? 206 : 200,
      statusText: range ? "Partial Content" : "OK",
      headers,
    });
  });
}
