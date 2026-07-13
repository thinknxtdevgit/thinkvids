"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createWorkspace } from "@/lib/dal/workspaces";

export type AuthResult = { ok: true; needsConfirmation?: boolean } | { ok: false; error: string };

export async function signIn(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };

  return { ok: true };
}

export async function signUp(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();

  if (!email || !password) {
    return { ok: false, error: "Email and password are required." };
  }
  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  // Provision the account server-side with the service-role client and mark the
  // email confirmed. This sends NO confirmation email, so signup never hits
  // Supabase's email-send rate limit ("over_email_send_rate_limit"), and the
  // user gets immediate access — the behavior the app had before.
  const admin = createAdminClient();
  const { error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName || null },
  });
  if (createError) {
    const msg = /already been registered|already registered/i.test(createError.message)
      ? "An account with this email already exists. Please sign in."
      : createError.message;
    return { ok: false, error: msg };
  }

  // Establish the session (sets auth cookies) so downstream work like workspace
  // creation runs as the new user.
  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) return { ok: false, error: signInError.message };

  return { ok: true, needsConfirmation: false };
}

// Sign up and, when a session is immediately available (email confirmation
// disabled), provision the user's first workspace with them as owner.
export async function registerWithWorkspace(formData: FormData): Promise<AuthResult> {
  const workspaceName = String(formData.get("workspace_name") ?? "").trim();
  if (!workspaceName) {
    return { ok: false, error: "Workspace name is required." };
  }

  const result = await signUp(formData);
  if (!result.ok) return result;

  // Email confirmation on → defer workspace creation until first login.
  if (result.needsConfirmation) return result;

  try {
    await createWorkspace({ name: workspaceName });
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Failed to create workspace.",
    };
  }

  return { ok: true };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}
