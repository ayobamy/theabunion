"use client";

import { motion, useReducedMotion } from "motion/react";
import { wedding } from "@/lib/wedding";

const ITEMS = [
  `${wedding.names.a} & ${wedding.names.b}`,
  "12 · 09 · 26",
  wedding.hashtags[0],
  wedding.hashtags[1],
];

function Track() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="mx-8 whitespace-nowrap text-sm font-light uppercase tracking-[0.3em] text-gold-light/55 sm:mx-14 sm:text-xl">
            {item}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold/45" />
        </span>
      ))}
    </div>
  );
}

/** Editorial infinite marquee band — a kinetic, full-bleed flourish. */
export function Marquee() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-hidden
      className="relative z-10 overflow-hidden border-y border-gold/10 py-9 sm:py-14"
    >
      <motion.div
        className="flex w-max"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduced
            ? undefined
            : { duration: 34, repeat: Infinity, ease: "linear" }
        }
      >
        <Track />
        <Track />
      </motion.div>
    </section>
  );
}
