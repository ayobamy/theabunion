"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { wedding } from "@/lib/wedding";

const ease = [0.22, 1, 0.36, 1] as const;

const stage = {
  hidden: { scale: 1.05 },
  show: (delay: number) => ({
    scale: 1,
    transition: { staggerChildren: 0.12, delayChildren: delay, duration: 2, ease },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease } },
};

const nameStage = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const nameLetterVariant = {
  hidden: { y: "115%", rotate: 2 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease } },
};

function NameLine({ text }: { text: string }) {
  return (
    <motion.span
      variants={nameStage}
      className="flex overflow-hidden pb-[0.12em] justify-center"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={nameLetterVariant}
          className="gold block"
          style={{ whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);

  // Scroll parallax: the whole hero eases up and fades as you leave.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Cursor parallax: layers drift at different depths for a quiet 3D feel.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 22 });
  const sy = useSpring(py, { stiffness: 60, damping: 22 });
  const nameX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const nameY = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const base = reduced ? 0 : 3.1;

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <motion.div
        style={
          reduced ? { opacity: fade } : { opacity: fade, x: nameX, y: nameY }
        }
        variants={stage}
        initial="hidden"
        animate="show"
        custom={base}
        className="relative flex flex-col items-center"
      >
        <motion.p
          variants={fadeUp}
          className="font-arabic text-xl text-gold-light/80 sm:text-2xl"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-10 pl-[0.5em] text-[0.68rem] font-light uppercase tracking-[0.5em] text-cream/55 sm:text-xs"
        >
          We&apos;re getting married
        </motion.p>

        <h1 className="mt-6 flex flex-col items-center font-serif font-medium leading-[0.9] tracking-[-0.01em] text-[clamp(3.6rem,17vw,10rem)]">
          <NameLine text={wedding.names.a} />
          <span className="relative grid place-items-center py-[0.04em]">
            <motion.span
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: reduced ? 0.3 : [0.18, 0.42, 0.18] }}
              transition={
                reduced
                  ? { duration: 0.6 }
                  : {
                      delay: base + 0.7,
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="pointer-events-none absolute h-[1.5em] w-[1.5em] rounded-full bg-[radial-gradient(circle,var(--glow-gold-strong),transparent_70%)] blur-2xl"
            />
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: reduced ? 1 : [1, 1.07, 1] }}
              transition={{
                opacity: { delay: base + 0.6, duration: 1, ease },
                scale: reduced
                  ? { duration: 0 }
                  : {
                      delay: base + 0.7,
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
              }}
              className="gold relative select-none font-amp italic leading-none text-[0.6em]"
            >
              &amp;
            </motion.span>
          </span>
          <NameLine text={wedding.names.b} />
        </h1>

        <motion.p
          variants={fadeUp}
          className="mt-12 text-[0.72rem] font-light uppercase tracking-[0.34em] text-cream/70 sm:text-sm"
        >
          {wedding.dateLabel}
        </motion.p>
      </motion.div>
    </section>
  );
}
