import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  email?: unknown;
  attending?: unknown;
  guests?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate(body: Body) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
  const attending = typeof body.attending === "boolean" ? body.attending : null;
  const guests = Number.isInteger(body.guests) ? (body.guests as number) : 1;

  if (!name || name.length > 120) return { error: "NAME_REQUIRED" as const };
  if (attending === null) return { error: "ATTENDING_REQUIRED" as const };
  if (guests < 1 || guests > 12) return { error: "GUESTS_RANGE" as const };
  if (email && !EMAIL_RE.test(email))
    return { error: "EMAIL_INVALID" as const };

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

  const { error } = await supabase.from("rsvps").insert(result.row);
  if (error) {
    console.error("[rsvp] insert failed:", error.message, error.code ?? "");
    return NextResponse.json({ error: "DB_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
