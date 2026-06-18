import { Reveal } from "./Reveal";
import { wedding } from "@/lib/wedding";

/** Sign-off with the couple's names and the celebration hashtags. */
export function Closing() {
  return (
    <footer className="relative z-10 flex flex-col items-center bg-forest-night px-6 pb-32 pt-28 text-center sm:pt-36">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <Reveal className="flex flex-col items-center gap-8">
        <p className="font-serif text-xl font-light italic text-cream/70 sm:text-2xl">
          With all our love,
        </p>
        <p className="gold font-serif text-4xl font-light italic sm:text-6xl">
          {wedding.names.a} &amp; {wedding.names.b}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {wedding.hashtags.map((tag) => (
            <span
              key={tag}
              className="text-[0.66rem] font-light uppercase tracking-[0.28em] text-gold-light/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </Reveal>
    </footer>
  );
}
