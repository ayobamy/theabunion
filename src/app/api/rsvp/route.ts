import { NextResponse } from "next/server";
import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  email?: unknown;
  attending?: unknown;
  guests?: unknown;
  message?: unknown;
};

type Row = {
  name: string;
  email: string | null;
  attending: boolean;
  guests: number;
  message: string | null;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate(body: Body): { error: string } | { row: Row } {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message =
    typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
  const attending = typeof body.attending === "boolean" ? body.attending : null;
  const guests = Number.isInteger(body.guests) ? (body.guests as number) : 1;

  if (!name || name.length > 120) return { error: "NAME_REQUIRED" };
  if (attending === null) return { error: "ATTENDING_REQUIRED" };
  if (guests < 1 || guests > 12) return { error: "GUESTS_RANGE" };
  if (email && !EMAIL_RE.test(email)) return { error: "EMAIL_INVALID" };

  return {
    row: {
      name,
      email: email || null,
      attending,
      guests,
      message: message || null,
    },
  };
}

// One row per email: a guest who responds again updates their entry
// (this also tolerates any pre-existing duplicate rows). Guests without
// an email can't be deduped, so we insert them.
async function saveRsvp(
  db: SupabaseClient,
  row: Row,
): Promise<PostgrestError | null> {
  if (row.email) {
    const updated = await db
      .from("rsvps")
      .update(row, { count: "exact" })
      .eq("email", row.email);
    if (updated.error) return updated.error;
    if ((updated.count ?? 0) > 0) return null;
  }

  const { error } = await db.from("rsvps").insert(row);
  return error;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const result = validate(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "NOT_CONFIGURED" }, { status: 503 });
  }

  const dbError = await saveRsvp(supabase, result.row);
  if (dbError) {
    console.error("[rsvp] write failed:", dbError.message, dbError.code ?? "");
    return NextResponse.json({ error: "DB_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
