import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";
import { wedding } from "@/lib/wedding";

/** The marriage verse — quiet, centred, with gold ornament. */
export function Verse() {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 py-24 text-center sm:py-32">
      <Reveal className="flex max-w-2xl flex-col items-center gap-7">
        <Ornament />
        <blockquote className="font-serif text-[clamp(1.3rem,4vw,2.1rem)] italic leading-relaxed text-cream">
          &ldquo;{wedding.verse}&rdquo;
        </blockquote>
        <cite className="text-[0.7rem] font-light uppercase not-italic tracking-[0.24em] text-gold sm:text-sm">
          {wedding.verseRef}
        </cite>
      </Reveal>
    </section>
  );
}
