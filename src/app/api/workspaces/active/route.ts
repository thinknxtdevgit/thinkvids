import { cookies } from "next/headers";
import { z } from "zod";
import { guard, jsonError, jsonOk, parseBody, requireApiUser } from "@/lib/api/http";
import { getMemberships, ACTIVE_WORKSPACE_COOKIE, getActiveMembership, getProfile } from "@/lib/dal/auth";
import { getWorkspace } from "@/lib/dal/workspaces";

const schema = z.object({ workspace_id: z.string().uuid() });

// Get details of the caller's active workspace.
export async function GET() {
  return guard(async () => {
    const auth = await requireApiUser();
    if (!auth.ok) return auth.response;

    const membership = await getActiveMembership();
    if (!membership) {
      return jsonOk({ workspace: null });
    }

    const workspace = await getWorkspace(membership.workspace_id);
    return jsonOk({ workspace });
  });
}

// Switch the caller's "active" workspace by setting a cookie. Only workspaces
// the user actually belongs to are allowed, unless the caller is a platform owner.
export async function POST(request: Request) {
  return guard(async () => {
    const auth = await requireApiUser();
    if (!auth.ok) return auth.response;

    const body = await parseBody(request, schema);
    if (!body.ok) return body.response;

    const profile = await getProfile();
    const isPlatformOwner = profile?.is_platform_owner ?? false;

    const memberships = await getMemberships();
    const isMember = memberships.some((m) => m.workspace_id === body.data.workspace_id);

    if (!isMember && !isPlatformOwner) {
      return jsonError("Not a member of this workspace", 403);
    }

    const cookieStore = await cookies();
    cookieStore.set(ACTIVE_WORKSPACE_COOKIE, body.data.workspace_id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return jsonOk({ active_workspace_id: body.data.workspace_id });
  });
}
