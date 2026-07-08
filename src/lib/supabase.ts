import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client. The service-role key never reaches the
// browser — RSVP writes go through the /api/rsvp route handler only.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  client ??= createClient(url, key, { auth: { persistSession: false } });
  return client;
}
