import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// OAuth (Google) redirect lands here with a PKCE `code`. Exchange it for a
// session (sets auth cookies), then send the user into the app.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error_description") || searchParams.get("error");
  const next = searchParams.get("next");

  if (error) {
    if (next && (next.startsWith("tempexpoproject://") || next.startsWith("exp://"))) {
      return NextResponse.redirect(`${next}?error=${encodeURIComponent(error)}`);
    }
    return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(error)}`);
  }
  if (!code) {
    const errorMsg = "Missing auth code";
    if (next && (next.startsWith("tempexpoproject://") || next.startsWith("exp://"))) {
      return NextResponse.redirect(`${next}?error=${encodeURIComponent(errorMsg)}`);
    }
    return NextResponse.redirect(`${origin}/auth/login?error=${encodeURIComponent(errorMsg)}`);
  }

  const supabase = await createClient();
  const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) {
    if (next && (next.startsWith("tempexpoproject://") || next.startsWith("exp://"))) {
      return NextResponse.redirect(`${next}?error=${encodeURIComponent(exchangeError.message)}`);
    }
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(exchangeError.message)}`,
    );
  }

  if (next && (next.startsWith("tempexpoproject://") || next.startsWith("exp://"))) {
    const session = data?.session;
    if (session) {
      return NextResponse.redirect(
        `${next}#access_token=${session.access_token}&refresh_token=${session.refresh_token}`
      );
    }
    return NextResponse.redirect(`${next}?error=${encodeURIComponent("Failed to retrieve session")}`);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
