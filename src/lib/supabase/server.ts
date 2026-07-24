import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { publicSupabaseConfig } from "@/lib/env";
import type { Database } from "@/types/db";

// Server Supabase client (anon key, RLS-enforced) bound to the request cookies.
// Use inside Server Components, Route Handlers, and Server Actions.
//
// Native clients (React Native) have no cookie jar, so they authenticate by
// sending `Authorization: Bearer <supabase access_token>`. When that header is
// present we build a token-bound client (still the anon key, so RLS applies as
// the token's user) instead of a cookie-bound one. The cookie path is unchanged
// for the web app.
export async function createClient() {
  const { url, anonKey } = publicSupabaseConfig();

  const authHeader = (await headers()).get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return createServerClient<Database>(url, anonKey, {
      global: { headers: { Authorization: authHeader } },
      cookies: { getAll: () => [], setAll: () => {} },
    });
  }

  const cookieStore = await cookies();
  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // `setAll` is called from a Server Component where cookies are
          // read-only. The session is refreshed in proxy.ts instead, so this
          // is safe to ignore.
        }
      },
    },
  });
}
