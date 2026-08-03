import "server-only";

import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ACTIVE_WORKSPACE_COOKIE, primaryRole } from "@/lib/auth/roles";
import type { Profile, WorkspaceMember, WorkspaceRole } from "@/types/db";
import type { User } from "@supabase/supabase-js";

// Re-exported from the shared (client-safe) roles module so existing importers
// of `@/lib/dal/auth` keep working.
export { ACTIVE_WORKSPACE_COOKIE };

// Validated auth user for the current request (deduped per render pass).
export const getUser = cache(async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getProfile = cache(async (): Promise<Profile | null> => {
  const user = await getUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data ?? null;
});

// All active memberships for the current user.
export const getMemberships = cache(async (): Promise<WorkspaceMember[]> => {
  const user = await getUser();
  if (!user) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("workspace_members")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active");
  return data ?? [];
});

// Whether the user has at least one membership that is not yet active (an
// invitation they haven't accepted). Used to tell a freshly-invited member
// apart from a brand-new platform owner who has no memberships at all.
export const hasPendingMembership = cache(async (): Promise<boolean> => {
  const user = await getUser();
  if (!user) return false;
  const supabase = await createClient();
  const { count } = await supabase
    .from("workspace_members")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .neq("status", "active");
  return (count ?? 0) > 0;
});

// Resolve the "current" workspace: the cookie-selected one if the user still
// belongs to it, otherwise their highest-privilege membership.
export const getActiveMembership = cache(async (): Promise<WorkspaceMember | null> => {
  const memberships = await getMemberships();
  const profile = await getProfile();
  const isPlatformOwner = profile?.is_platform_owner ?? false;

  // Native clients select the active workspace with a header (no cookie jar).
  const headerWorkspace = (await headers()).get("x-workspace-id");
  if (headerWorkspace) {
    const match = memberships.find((m) => m.workspace_id === headerWorkspace);
    if (match) return match;
    if (isPlatformOwner) {
      return {
        id: `mock-member-${headerWorkspace}`,
        workspace_id: headerWorkspace,
        user_id: profile!.id,
        role: "owner",
        status: "active",
        invited_by: null,
        password_changed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  }

  const cookieStore = await cookies();
  const selected = cookieStore.get(ACTIVE_WORKSPACE_COOKIE)?.value;
  if (selected) {
    const match = memberships.find((m) => m.workspace_id === selected);
    if (match) return match;
    if (isPlatformOwner) {
      return {
        id: `mock-member-${selected}`,
        workspace_id: selected,
        user_id: profile!.id,
        role: "owner",
        status: "active",
        invited_by: null,
        password_changed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  }

  if (memberships.length === 0) {
    if (isPlatformOwner) {
      const supabase = await createClient();
      const { data: firstWs } = await supabase.from("workspaces").select("id").limit(1).maybeSingle();
      if (firstWs) {
        return {
          id: `mock-member-${firstWs.id}`,
          workspace_id: firstWs.id,
          user_id: profile!.id,
          role: "owner",
          status: "active",
          invited_by: null,
          password_changed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
    }
    return null;
  }

  const best = primaryRole(memberships.map((m) => m.role));
  return memberships.find((m) => m.role === best) ?? memberships[0];
});

export async function getCurrentRole(): Promise<WorkspaceRole | null> {
  const membership = await getActiveMembership();
  return membership?.role ?? null;
}

// Page guard: redirect to login when unauthenticated.
export async function requireUser(): Promise<User> {
  const user = await getUser();
  if (!user) redirect("/auth/login");
  return user;
}

// Page guard: ensure the user has an active workspace membership (optionally
// with one of the given roles), redirecting otherwise.
export async function requireMembership(roles?: WorkspaceRole[]): Promise<WorkspaceMember> {
  await requireUser();
  const membership = await getActiveMembership();
  if (!membership) redirect("/dashboard");
  if (roles && !roles.includes(membership.role)) redirect("/dashboard");
  return membership;
}
