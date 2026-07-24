import "server-only";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { jsonOk, jsonError, parseBody, guard } from "@/lib/api/http";
import { uniqueSlug } from "@/lib/utils/slug";

// Public signup for native clients. The web app signs up via a Server Action
// that uses the service-role `admin.createUser({ email_confirm: true })` trick
// to skip the confirmation email (and its rate limit). A mobile device can't
// hold the service role, so it POSTs here instead, then signs in client-side.
const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  full_name: z.string().trim().optional(),
  workspace_name: z.string().trim().min(1, "Workspace name is required."),
});

// ponytail: naive per-instance in-memory limiter. Good enough to blunt spam;
// move to a shared store (Upstash/DB) if you run multiple instances or need
// hard guarantees.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  return guard(async () => {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return jsonError("Too many attempts. Please try again shortly.", 429);
    }

    const parsed = await parseBody(request, RegisterSchema);
    if (!parsed.ok) return parsed.response;
    const { email, password, full_name, workspace_name } = parsed.data;

    const admin = createAdminClient();

    // Create a confirmed user (no email sent → no email-rate-limit). The
    // `handle_new_user` DB trigger provisions the profile from user_metadata.
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: full_name || null },
    });
    if (createError) {
      const msg = /already been registered|already registered/i.test(createError.message)
        ? "An account with this email already exists. Please sign in."
        : createError.message;
      return jsonError(msg, 400);
    }
    const userId = created.user.id;

    // Provision the first workspace + owner membership with the admin client
    // (no user session exists yet). If either insert fails, roll back the user
    // so the email can be reused cleanly.
    const { data: workspace, error: wsError } = await admin
      .from("workspaces")
      .insert({
        name: workspace_name,
        slug: uniqueSlug(workspace_name),
        owner_id: userId,
        subscription_tier: "basic",
      })
      .select("id")
      .single();
    if (wsError) {
      await admin.auth.admin.deleteUser(userId);
      return jsonError(wsError.message, 400);
    }

    const { error: memberError } = await admin.from("workspace_members").insert({
      workspace_id: workspace.id,
      user_id: userId,
      role: "owner",
      status: "active",
    });
    if (memberError) {
      await admin.auth.admin.deleteUser(userId);
      return jsonError(memberError.message, 400);
    }

    return jsonOk({ workspaceId: workspace.id });
  });
}
