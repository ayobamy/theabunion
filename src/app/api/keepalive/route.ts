import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Pinged by a Vercel cron (see vercel.json) so the free-tier Supabase
// project never idles into a paused state and drops RSVP submissions.
export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  const { error } = await supabase
    .from("rsvps")
    .select("id", { head: true, count: "exact" });

  if (error) {
    console.error("[keepalive] db ping failed:", error.message, error.code ?? "");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
