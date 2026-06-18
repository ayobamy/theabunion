"use client";

import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import { wedding } from "@/lib/wedding";
import { motion, useReducedMotion } from "motion/react";

const wordVariant = {
  hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" as const } }
};

const quoteVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

/** The marriage verse — quiet, centred, with gold ornament. */
export function Verse() {
  const reduced = useReducedMotion();
  const words = wedding.verse.split(" ");

  return (
    <section className="relative z-10 flex flex-col items-center px-6 py-24 text-center sm:py-32">
      <Reveal className="flex max-w-2xl flex-col items-center gap-7">
        <Ornament />
        <motion.blockquote 
          className="font-serif text-[clamp(1.3rem,4vw,2.1rem)] italic leading-relaxed text-cream"
          variants={reduced ? {} : quoteVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="inline-block mr-[0.2em] opacity-80">&ldquo;</span>
          {words.map((word, i) => (
            <motion.span key={i} variants={reduced ? {} : wordVariant} className="inline-block mr-[0.2em]">
              {word}
            </motion.span>
          ))}
          <span className="inline-block opacity-80">&rdquo;</span>
        </motion.blockquote>
        <cite className="text-[0.7rem] font-light uppercase not-italic tracking-[0.24em] text-gold sm:text-sm">
          {wedding.verseRef}
        </cite>
      </Reveal>
    </section>
  );
}
