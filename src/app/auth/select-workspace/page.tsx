import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { requireUser, ACTIVE_WORKSPACE_COOKIE } from "@/lib/dal/auth";
import { listWorkspaces } from "@/lib/dal/workspaces";
import { signOut } from "@/app/auth/actions";
import { LogOut, ArrowRight } from "lucide-react";

export default async function SelectWorkspacePage() {
  // Ensure the user is logged in
  await requireUser();

  // Get the active workspaces they belong to
  const workspaces = await listWorkspaces();

  // If they somehow have no workspaces, redirect them to create one
  if (workspaces.length === 0) {
    redirect("/dashboard/owner/workspaces/new");
  }

  // Server Action to set the workspace cookie and redirect
  async function selectWorkspace(formData: FormData) {
    "use server";
    const workspaceId = formData.get("workspaceId") as string;
    if (!workspaceId) return;

    const cookieStore = await cookies();
    cookieStore.set(ACTIVE_WORKSPACE_COOKIE, workspaceId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    
    // Redirect to dashboard to evaluate final route matching the role
    redirect("/dashboard");
  }

  // Get initials for a workspace name helper
  function getInitials(name: string): string {
    return name
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  // Color helper for roles to style the badges nicely
  function getRoleBadgeStyle(role: string): string {
    switch (role) {
      case "owner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "admin":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "editor":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-zinc-50 text-zinc-600 border-zinc-200";
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Decorative background elements */}
      <div className="absolute -left-16 -top-16 w-[350px] h-[350px] rounded-full border border-zinc-200/50 pointer-events-none" />
      <div className="absolute -right-24 -bottom-24 w-[500px] h-[500px] rounded-full border border-zinc-200/30 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        {/* Brand Logo */}
        <div className="flex justify-center select-none">
          <img src="/ThinkNEXT-LOGO-NEW.svg" alt="ThinkNEXT Logo" className="h-14 w-auto" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
            Welcome back!
          </h2>
          <p className="mt-1 text-sm font-semibold text-zinc-400">
            Select a workspace to continue to your dashboard.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-zinc-200 sm:rounded-2xl sm:px-10 shadow-sm space-y-6">
          <div className="space-y-4">
            {workspaces.map((ws) => (
              <form key={ws.id} action={selectWorkspace}>
                <input type="hidden" name="workspaceId" value={ws.id} />
                <button
                  type="submit"
                  className="w-full text-left p-4 rounded-xl border border-zinc-150 hover:border-[#3f6445]/35 hover:bg-zinc-50/50 transition-all flex items-center justify-between group cursor-pointer active:scale-[0.99] select-none"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Logo / Initials */}
                    {ws.logo_url ? (
                      <img
                        src={ws.logo_url}
                        alt={ws.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-zinc-100"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-[#3f6445]/10 flex items-center justify-center font-bold text-sm text-[#3f6445] shrink-0">
                        {getInitials(ws.name)}
                      </div>
                    )}

                    {/* Info */}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-zinc-800 group-hover:text-zinc-900">
                          {ws.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border tracking-wider ${getRoleBadgeStyle(
                            ws.role,
                          )}`}
                        >
                          {ws.role}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-zinc-400 block">
                        /{ws.slug}
                      </span>
                    </div>
                  </div>

                  <span className="text-zinc-400 group-hover:text-zinc-600 transition-colors">
                    <ArrowRight size={16} />
                  </span>
                </button>
              </form>
            ))}
          </div>

          <hr className="border-zinc-100" />

          {/* Logout Button */}
          <form action={signOut} className="w-full">
            <button
              type="submit"
              className="w-full h-10 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] select-none"
            >
              <LogOut size={14} />
              Sign out of account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
