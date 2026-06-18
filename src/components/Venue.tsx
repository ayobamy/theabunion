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
      <Reveal className="flex w-full max-w-4xl flex-col items-center gap-12">
        <p className="text-[0.62rem] font-light uppercase tracking-[0.5em] text-cream/70 sm:text-xs">
          Our union will be celebrated at
        </p>

        {/* Hand-coded Elegant SVG Mosque Line Drawing */}
        <div className="w-full max-w-[500px] px-4">
          <motion.svg
            viewBox="0 -30 400 230"
            className="w-full drop-shadow-2xl"
            initial={reduced ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <g
              stroke="var(--gold)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Ground Line */}
              <motion.path variants={lineVariant} d="M 20 180 L 380 180" />

              {/* Main Onion Dome & Building */}
              <motion.path variants={lineVariant} d="M 140 180 L 140 110 C 140 70, 180 50, 200 20 C 220 50, 260 70, 260 110 L 260 180" />
              
              {/* Main Door */}
              <motion.path variants={lineVariant} d="M 180 180 L 180 140 C 180 120, 220 120, 220 140 L 220 180" />
              
              {/* Left Main Windows */}
              <motion.path variants={lineVariant} d="M 152 150 L 152 110 C 152 100, 168 100, 168 110 L 168 150 Z" />
              
              {/* Right Main Windows */}
              <motion.path variants={lineVariant} d="M 232 150 L 232 110 C 232 100, 248 100, 248 110 L 248 150 Z" />

              {/* Main Dome Crescent */}
              <motion.path variants={lineVariant} d="M 200 20 L 200 -5" />
              <motion.path variants={lineVariant} d="M 200 -5 C 185 -5, 185 -20, 200 -20 C 195 -15, 195 -10, 200 -5 Z" fill="var(--gold)" />

              {/* Left Small Dome & Building */}
              <motion.path variants={lineVariant} d="M 90 180 L 90 130 C 90 100, 110 90, 115 70 C 120 90, 140 100, 140 130" />
              <motion.path variants={lineVariant} d="M 103 150 L 103 125 C 103 115, 117 115, 117 125 L 117 150 Z" />
              <motion.path variants={lineVariant} d="M 115 70 L 115 60" />

              {/* Right Small Dome & Building */}
              <motion.path variants={lineVariant} d="M 310 180 L 310 130 C 310 100, 290 90, 285 70 C 280 90, 260 100, 260 130" />
              <motion.path variants={lineVariant} d="M 283 150 L 283 125 C 283 115, 297 115, 297 125 L 297 150 Z" />
              <motion.path variants={lineVariant} d="M 285 70 L 285 60" />

              {/* Left Minaret */}
              <motion.path variants={lineVariant} d="M 50 180 L 50 60 L 70 60 L 70 180" />
              <motion.path variants={lineVariant} d="M 45 60 L 75 60" />
              <motion.path variants={lineVariant} d="M 50 60 L 60 20 L 70 60" />
              <motion.path variants={lineVariant} d="M 60 20 L 60 5" />
              <motion.path variants={lineVariant} d="M 60 75 L 60 165" strokeDasharray="4 4" opacity="0.3" />

              {/* Right Minaret */}
              <motion.path variants={lineVariant} d="M 330 180 L 330 60 L 350 60 L 350 180" />
              <motion.path variants={lineVariant} d="M 325 60 L 355 60" />
              <motion.path variants={lineVariant} d="M 330 60 L 340 20 L 350 60" />
              <motion.path variants={lineVariant} d="M 340 20 L 340 5" />
              <motion.path variants={lineVariant} d="M 340 75 L 340 165" strokeDasharray="4 4" opacity="0.3" />

              {/* Accent details - ground bushes */}
              <motion.path variants={fadeVariant} d="M 20 180 Q 30 170 40 180 M 360 180 Q 370 170 380 180 M 70 180 Q 80 170 90 180 M 310 180 Q 320 170 330 180" />
              
              {/* Steps to Main Door */}
              <motion.path variants={fadeVariant} d="M 175 185 L 225 185 M 165 190 L 235 190 M 150 195 L 250 195" />
            </g>
          </motion.svg>
        </div>

        <h2 className="gold font-serif text-2xl font-light italic sm:text-4xl">
          To Be Disclosed
        </h2>
      </Reveal>
    </section>
  );
}
