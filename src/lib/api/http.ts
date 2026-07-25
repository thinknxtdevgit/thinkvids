import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";
import { getUser, getActiveMembership } from "@/lib/dal/auth";
import type { WorkspaceMember, WorkspaceRole } from "@/types/db";
import type { User } from "@supabase/supabase-js";

export function jsonOk<T>(data: T, init?: ResponseInit): NextResponse {
  return NextResponse.json({ data }, init);
}

export function jsonError(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

type AuthOk = { ok: true; user: User };
type AuthFail = { ok: false; response: NextResponse };

// Require an authenticated user for a route handler.
export async function requireApiUser(): Promise<AuthOk | AuthFail> {
  const user = await getUser();
  if (!user) return { ok: false, response: jsonError("Unauthorized", 401) };
  return { ok: true, user };
}

type MemberOk = { ok: true; user: User; membership: WorkspaceMember };

// Require an authenticated user with an active workspace membership, optionally
// constrained to a set of roles.
export async function requireApiMember(roles?: WorkspaceRole[]): Promise<MemberOk | AuthFail> {
  const user = await getUser();
  if (!user) return { ok: false, response: jsonError("Unauthorized", 401) };

  const membership = await getActiveMembership();
  if (!membership) return { ok: false, response: jsonError("No active workspace", 403) };
  if (roles && !roles.includes(membership.role)) {
    return { ok: false, response: jsonError("Insufficient permissions", 403) };
  }
  return { ok: true, user, membership };
}

// Parse + validate a JSON body with a Zod schema.
export async function parseBody<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return { ok: false, response: jsonError("Invalid JSON body", 400) };
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    const message = result.error.issues.map((i) => i.message).join("; ");
    return { ok: false, response: jsonError(message || "Validation failed", 422) };
  }
  return { ok: true, data: result.data };
}

// Wrap a handler body so thrown errors become clean 500 responses.
export async function guard(fn: () => Promise<NextResponse>): Promise<NextResponse> {
  try {
    return await fn();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error";
    return jsonError(message, 500);
  }
}

// Resolve the application's base URL dynamically from the request headers,
// falling back to request.url or environment configuration, ensuring that
// wildcards like 0.0.0.0 are filtered out.
import { APP_URL } from "@/lib/env";

export function getAppUrl(request: Request): string {
  // If APP_URL is configured to an explicit production domain (not local dev),
  // prefer it so production VPS setups (Hostinger/Nginx) use the canonical domain.
  if (
    APP_URL &&
    !APP_URL.includes("localhost") &&
    !APP_URL.includes("127.0.0.1") &&
    !APP_URL.includes("0.0.0.0")
  ) {
    return APP_URL.replace(/\/$/, "");
  }

  let host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  let proto = request.headers.get("x-forwarded-proto") || "http";

  if (host) {
    if (host.includes("0.0.0.0")) {
      host = host.replace("0.0.0.0", "localhost");
    }
    if (request.url.startsWith("https://")) {
      proto = "https";
    }
    return `${proto}://${host}`;
  }

  let origin = new URL(request.url).origin;
  if (origin.includes("0.0.0.0")) {
    origin = origin.replace("0.0.0.0", "localhost");
  }

  return origin || APP_URL || "http://localhost:3000";
}
