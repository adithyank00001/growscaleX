import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "./types"

/**
 * Browser-side Supabase client.
 * Safe to use in Client Components for auth and Realtime subscriptions.
 */
export function createBrowserSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
