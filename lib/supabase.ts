import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// CSCA-Prep.com — browser-safe Supabase client (foundation only).
// Configure via .env.local (see .env.example):
//   NEXT_PUBLIC_SUPABASE_URL=...
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
//
// Placeholder fallbacks keep `npm run build` green before credentials exist.
// Do not use the service_role key in client code.

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-key";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(url, anonKey);
  }
  return client;
}

// Default singleton for convenience.
export const supabase = getSupabase();

export function isSupabaseConfigured(): boolean {
  return (
    (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").length > 0 &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").length > 0
  );
}
