"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

export function Venue() {
  const reduced = useReducedMotion();

  const lineVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 3, ease: "easeInOut" as const } }
  };

  const fadeVariant = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1, delay: 2, ease: "easeOut" as const } }
  };

  return (
    <section className="relative z-10 flex flex-col items-center px-6 py-24 text-center sm:py-32">
      <Reveal className="flex w-full max-w-4xl flex-col items-center">
        <p className="mb-4 text-[0.62rem] font-light uppercase tracking-[0.5em] text-cream/70 sm:mb-6 sm:text-xs">
          Our union will be celebrated at
        </p>

        {/* Hand-coded Elegant SVG Hall Line Drawing */}
        <div className="w-full max-w-[800px] px-4">
          <motion.svg
            viewBox="0 -30 400 230"
            className="w-full drop-shadow-2xl"
            initial={reduced ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <g
              stroke="var(--gold)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Ground Line */}
              <motion.path variants={lineVariant} d="M 20 180 L 380 180" />

              {/* Central Block Steps */}
              <motion.path variants={lineVariant} d="M 140 180 L 140 170 L 260 170 L 260 180" />
              <motion.path variants={lineVariant} d="M 150 170 L 150 160 L 250 160 L 250 170" />

              {/* Central Building Base */}
              <motion.path variants={lineVariant} d="M 160 160 L 160 70 L 240 70 L 240 160" />

              {/* Roof Pediment */}
              <motion.path variants={lineVariant} d="M 150 70 L 200 30 L 250 70 Z" />
              <motion.path variants={lineVariant} d="M 165 65 L 200 40 L 235 65 Z" />

              {/* Pillars */}
              <motion.path variants={lineVariant} d="M 168 160 L 168 70" />
              <motion.path variants={lineVariant} d="M 176 160 L 176 70" />
              
              <motion.path variants={lineVariant} d="M 224 160 L 224 70" />
              <motion.path variants={lineVariant} d="M 232 160 L 232 70" />

              {/* Main Doors (Double Door) */}
              <motion.path variants={lineVariant} d="M 188 160 L 188 120 C 188 105, 212 105, 212 120 L 212 160" />
              <motion.path variants={lineVariant} d="M 200 160 L 200 110" />

              {/* Left Wing */}
              <motion.path variants={lineVariant} d="M 70 180 L 70 90 L 160 90" />
              <motion.path variants={lineVariant} d="M 65 90 L 160 90 L 160 85 L 65 85 Z" />
              {/* Left Wing Parapets */}
              <motion.path variants={lineVariant} d="M 75 85 L 75 75 L 85 75 L 85 85" />
              <motion.path variants={lineVariant} d="M 145 85 L 145 75 L 155 75 L 155 85" />

              {/* Right Wing */}
              <motion.path variants={lineVariant} d="M 330 180 L 330 90 L 240 90" />
              <motion.path variants={lineVariant} d="M 335 90 L 240 90 L 240 85 L 335 85 Z" />
              {/* Right Wing Parapets */}
              <motion.path variants={lineVariant} d="M 315 85 L 315 75 L 325 75 L 325 85" />
              <motion.path variants={lineVariant} d="M 245 85 L 245 75 L 255 75 L 255 85" />

              {/* Left Wing Windows */}
              <motion.path variants={lineVariant} d="M 90 150 L 90 120 C 90 110, 105 110, 105 120 L 105 150 Z" />
              <motion.path variants={lineVariant} d="M 125 150 L 125 120 C 125 110, 140 110, 140 120 L 140 150 Z" />
              <motion.path variants={lineVariant} d="M 90 135 L 105 135" />
              <motion.path variants={lineVariant} d="M 125 135 L 140 135" />

              {/* Right Wing Windows */}
              <motion.path variants={lineVariant} d="M 260 150 L 260 120 C 260 110, 275 110, 275 120 L 275 150 Z" />
              <motion.path variants={lineVariant} d="M 295 150 L 295 120 C 295 110, 310 110, 310 120 L 310 150 Z" />
              <motion.path variants={lineVariant} d="M 260 135 L 275 135" />
              <motion.path variants={lineVariant} d="M 295 135 L 310 135" />

              {/* Accent Bushes */}
              <motion.path variants={fadeVariant} d="M 30 180 C 10 160, 40 140, 50 160 C 60 140, 80 150, 70 180" />
              <motion.path variants={fadeVariant} d="M 370 180 C 390 160, 360 140, 350 160 C 340 140, 320 150, 330 180" />
            </g>
          </motion.svg>
        </div>

        <h2 className="mt-8 gold font-serif text-2xl font-light italic sm:mt-12 sm:text-4xl">
          To Be Disclosed
        </h2>
      </Reveal>
    </section>
  );
}
