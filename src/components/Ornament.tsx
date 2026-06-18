"use client";

import { motion, useReducedMotion } from "motion/react";

/** A slim gold divider with a central leaf — used between sections. */
export function Ornament({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  const lineVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" as const } }
  };

  const leafVariant = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 1, delay: 0.8, ease: "easeOut" as const } }
  };

  const circleVariant = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 1, ease: "easeOut" as const } }
  };

  return (
    <motion.svg
      viewBox="0 0 220 24"
      className={`h-6 w-[clamp(160px,42vw,220px)] ${className}`}
      aria-hidden="true"
      initial={reduced ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <g
        stroke="var(--gold)"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      >
        <motion.line variants={lineVariant} x1="14" y1="12" x2="88" y2="12" />
        <motion.line variants={lineVariant} x1="132" y1="12" x2="206" y2="12" />
        <motion.circle variants={circleVariant} cx="96" cy="12" r="1.6" fill="var(--gold)" stroke="none" />
        <motion.circle variants={circleVariant} cx="124" cy="12" r="1.6" fill="var(--gold)" stroke="none" />
      </g>
      <motion.path
        variants={leafVariant}
        style={{ transformOrigin: "110px 12px" }}
        d="M110 3 C115 8 115 16 110 21 C105 16 105 8 110 3 Z"
        fill="var(--gold)"
      />
    </motion.svg>
  );
}
