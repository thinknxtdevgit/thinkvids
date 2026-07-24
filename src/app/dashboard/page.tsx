import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getActiveMembership, getMemberships, hasPendingMembership, requireUser, ACTIVE_WORKSPACE_COOKIE } from "@/lib/dal/auth";
import { getDefaultDashboard } from "@/lib/auth/roles";
import { acceptInvitation } from "@/lib/dal/invitations";

// Entry point for /dashboard — routes the user to the dashboard matching their
// active workspace role. Users with no workspace yet are sent to onboarding.
export default async function DashboardIndex() {
  const user = await requireUser();
  let memberships = await getMemberships();

  if (memberships.length === 0) {
    // No *active* membership. If they have a pending invitation, automatically
    // accept (activate) it since they have successfully authenticated.
    if (await hasPendingMembership()) {
      await acceptInvitation(user.id);
      memberships = await getMemberships();
    }
  }

  if (memberships.length === 0) {
    redirect("/dashboard/owner/workspaces/new");
  }

  // If the user belongs to multiple active workspaces and no active workspace cookie
  // is set, redirect them to the workspace selector.
  const cookieStore = await cookies();
  const hasActiveCookie = cookieStore.has(ACTIVE_WORKSPACE_COOKIE);

  if (memberships.length > 1 && !hasActiveCookie) {
    redirect("/auth/select-workspace");
  }

  const membership = await getActiveMembership();
  if (!membership) {
    redirect("/dashboard/owner/workspaces/new");
  }

  redirect(getDefaultDashboard(membership.role));
}
