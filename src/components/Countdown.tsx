"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { wedding } from "@/lib/wedding";

type Parts = { days: number; hours: number; mins: number; secs: number };

function diffToParts(target: number): Parts | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function TimeUnit({
  value,
  label,
  reduced,
}: {
  value: string;
  label: string;
  reduced: boolean;
}) {
  return (
    <div className="flex min-w-[78px] flex-col items-center gap-3 rounded-2xl border border-gold/20 bg-white/5 px-4 py-5 backdrop-blur-md sm:min-w-[120px] sm:px-7 sm:py-7">
      <span className="relative block h-[1em] overflow-hidden text-[clamp(2.4rem,9vw,4.5rem)] font-semibold leading-none text-gold-light tabular-nums">
        {reduced ? (
          value
        ) : (
          <motion.span
            key={value}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {value}
          </motion.span>
        )}
      </span>
      <span className="text-[0.58rem] font-light uppercase tracking-[0.28em] text-cream/50 sm:text-[0.68rem]">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const reduced = useReducedMotion() ?? false;
  const [parts, setParts] = useState<Parts | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const target = wedding.date.getTime();
    const update = () => {
      const next = diffToParts(target);
      if (next) setParts(next);
      else setDone(true);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown"
      className="relative z-10 flex flex-col items-center px-6 py-32 text-center sm:py-44"
    >
      <p className="text-[0.62rem] font-light uppercase tracking-[0.5em] text-cream/45 sm:text-xs">
        Counting down
      </p>

      {done ? (
        <p className="mt-10 font-serif text-2xl font-light italic text-gold-light sm:text-3xl">
          Today is the day. Alhamdulillah.
        </p>
      ) : (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <TimeUnit
            value={String(parts?.days ?? "--")}
            label="Days"
            reduced={reduced}
          />
          <TimeUnit
            value={pad(parts?.hours ?? 0)}
            label="Hours"
            reduced={reduced}
          />
          <TimeUnit
            value={pad(parts?.mins ?? 0)}
            label="Minutes"
            reduced={reduced}
          />
          <TimeUnit
            value={pad(parts?.secs ?? 0)}
            label="Seconds"
            reduced={reduced}
          />
        </div>
      )}
    </section>
  );
}
