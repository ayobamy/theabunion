"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { wedding } from "@/lib/wedding";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[0.6rem] font-light uppercase tracking-[0.28em] text-gold/70">
        {label}
      </span>
      <span className="font-serif text-lg text-cream sm:text-xl">{value}</span>
    </div>
  );
}

export function Registry() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    const ok = await navigator.clipboard
      .writeText(wedding.registry.accountNumber)
      .then(() => true, () => false);
    setStatus(ok ? "copied" : "error");
    window.setTimeout(() => setStatus("idle"), 2200);
  }

  return (
    <section className="relative z-10 flex flex-col items-center px-6 py-24 text-center sm:py-32">
      <Reveal className="flex w-full max-w-md flex-col items-center">
        <p className="text-[0.62rem] font-light uppercase tracking-[0.5em] text-cream/45 sm:text-xs">
          Gifts
        </p>
        <h2 className="gold mt-5 font-serif text-3xl font-light italic sm:text-5xl">
          Your presence is our gift
        </h2>
        <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-cream/60 sm:text-base">
          Your prayers and presence mean the world to us. Should you wish to
          honour us with something more, a contribution towards our new life
          together would be received with heartfelt gratitude.
        </p>

        <div className="mt-10 flex w-full flex-col gap-7 rounded-3xl border border-gold/20 bg-white/5 px-8 py-10 text-left backdrop-blur-md">
          <Row label="Bank" value={wedding.registry.bank} />
          <Row label="Account name" value={wedding.registry.accountName} />

          <div className="flex flex-col gap-1.5">
            <span className="text-[0.6rem] font-light uppercase tracking-[0.28em] text-gold/70">
              Account number
            </span>
            <div className="flex items-center justify-between gap-4">
              <span className="font-date text-2xl tracking-[0.15em] text-gold-light tabular-nums sm:text-3xl">
                {wedding.registry.accountNumber}
              </span>
              <button
                type="button"
                onClick={copy}
                aria-label="Copy account number"
                className="flex shrink-0 items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-[0.6rem] font-light uppercase tracking-[0.2em] text-gold-light transition-colors duration-300 hover:border-gold hover:bg-gold/10"
              >
                {status === "copied" ? (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
                {status === "copied" ? "Copied" : status === "error" ? "Copy failed" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
