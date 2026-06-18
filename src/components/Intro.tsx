"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { wedding } from "@/lib/wedding";

// How long the opening holds before the curtain wipes away.
const HOLD_MS = 2700;

const stage = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

const slideUp = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function NameLine({ text, className }: { text: string; className: string }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span variants={slideUp} className={`block ${className}`}>
        {text}
      </motion.span>
    </span>
  );
}

export function Intro() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setShow(false), HOLD_MS);
    return () => clearTimeout(t);
  }, [reduced]);

  // Visitors who prefer reduced motion skip the opening entirely.
  if (reduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[var(--bg)]"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex flex-col items-center px-6 text-center"
            exit={{ y: -48, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 1 }}
              className="mb-8 pl-[0.5em] text-[0.6rem] font-light uppercase tracking-[0.55em] text-cream/50 sm:text-[0.7rem]"
            >
              We&apos;re getting married
            </motion.p>

            <motion.h2
              variants={stage}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center font-serif font-light leading-[0.94] text-[clamp(3rem,13vw,8rem)]"
            >
              <NameLine text={wedding.names.a} className="gold" />
              <span className="block overflow-hidden py-1">
                <motion.span
                  variants={slideUp}
                  className="block text-[0.32em] italic text-cream/70"
                >
                  and
                </motion.span>
              </span>
              <NameLine text={wedding.names.b} className="gold" />
            </motion.h2>
          </motion.div>

          {/* Slim gold loader sweeping across the foot of the screen */}
          <motion.div
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-gold/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
