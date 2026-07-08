"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const ERROR_TEXT: Record<string, string> = {
  NAME_REQUIRED: "Please enter your name.",
  ATTENDING_REQUIRED: "Please let us know if you can make it.",
  GUESTS_RANGE: "Guests must be between 1 and 12.",
  EMAIL_INVALID: "That email address looks off — please check it.",
  NOT_CONFIGURED: "RSVP isn't live yet. Please check back soon.",
  DB_ERROR: "We couldn't save your response. Please try again.",
};

const inputClass =
  "w-full rounded-xl border border-gold/25 bg-white/5 px-4 py-3 text-cream placeholder:text-cream/35 backdrop-blur-md transition-colors duration-300 focus:border-gold focus:outline-none";

export function Rsvp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError(ERROR_TEXT.NAME_REQUIRED);
    if (attending === null) return setError(ERROR_TEXT.ATTENDING_REQUIRED);

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, attending, guests, message }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus("error");
        setError(ERROR_TEXT[data.error ?? ""] ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <section
      id="rsvp"
      className="relative z-10 flex flex-col items-center px-6 py-24 text-center sm:py-32"
    >
      <Reveal className="flex w-full max-w-md flex-col items-center">
        <p className="text-[0.62rem] font-light uppercase tracking-[0.5em] text-cream/45 sm:text-xs">
          RSVP
        </p>
        <h2 className="gold mt-5 font-serif text-3xl font-light italic sm:text-5xl">
          Will you celebrate with us?
        </h2>

        {status === "success" ? (
          <p
            role="status"
            className="mt-10 font-serif text-xl font-light italic text-gold-light sm:text-2xl"
          >
            {attending
              ? "Thank you. We can't wait to celebrate with you. 🤍"
              : "Thank you for letting us know — you'll be missed."}
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-10 flex w-full flex-col gap-5 text-left">
            <div className="flex flex-col gap-2">
              <label htmlFor="rsvp-name" className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/60">
                Your name
              </label>
              <input
                id="rsvp-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Full name"
              />
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-[0.7rem] uppercase tracking-[0.2em] text-cream/60">
                Will you attend?
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Joyfully accept", value: true },
                  { label: "Regretfully decline", value: false },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setAttending(opt.value)}
                    aria-pressed={attending === opt.value}
                    className={`rounded-xl border px-4 py-3 text-sm font-light transition-colors duration-300 ${
                      attending === opt.value
                        ? "border-gold bg-gold/15 text-gold-light"
                        : "border-gold/20 bg-white/5 text-cream/70 hover:border-gold/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {attending === true && (
              <div className="flex flex-col gap-2">
                <label htmlFor="rsvp-guests" className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/60">
                  Number of guests (including you)
                </label>
                <input
                  id="rsvp-guests"
                  type="number"
                  min={1}
                  max={12}
                  value={guests}
                  onChange={(e) => setGuests(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
                  className={inputClass}
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="rsvp-email" className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/60">
                Email <span className="text-cream/35">(optional)</span>
              </label>
              <input
                id="rsvp-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="rsvp-message" className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/60">
                A note for the couple <span className="text-cream/35">(optional)</span>
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Share your wishes…"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-gold-light">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 rounded-full border border-gold/40 bg-gold/10 px-8 py-4 text-[0.7rem] font-light uppercase tracking-[0.28em] text-gold-light backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold/20 active:scale-[0.98] disabled:opacity-50"
            >
              {status === "submitting" ? "Sending…" : "Send RSVP"}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
