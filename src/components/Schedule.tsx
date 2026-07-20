import { Reveal } from "./Reveal";
import { wedding } from "@/lib/wedding";

/** Order of the day — Nikah + Walimah together in a single card. */
export function Schedule() {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 py-24 text-center sm:py-32">
      <Reveal className="flex w-full max-w-xl flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[0.62rem] font-light uppercase tracking-[0.5em] text-cream/45 sm:text-xs">
            Order of the day
          </p>
          <h2 className="gold font-serif text-3xl font-light italic sm:text-5xl">
            The celebration
          </h2>
        </div>

        <div className="w-full rounded-3xl border border-gold/20 bg-white/5 px-8 py-10 backdrop-blur-md sm:px-12 sm:py-12">
          <p className="text-[0.6rem] font-light uppercase tracking-[0.32em] text-cream/45">
            Begins at
          </p>
          <p className="gold mt-2 font-date text-4xl font-light sm:text-5xl">
            {wedding.celebrationStart}
          </p>

          <div className="mt-10 flex flex-col gap-8">
            {wedding.schedule.map((item, i) => (
              <div
                key={item.name}
                className={
                  i > 0 ? "border-t border-gold/15 pt-8" : undefined
                }
              >
                <p className="gold font-serif text-2xl font-light italic sm:text-3xl">
                  {item.name}
                </p>
                <p className="mt-1 text-[0.6rem] font-light uppercase tracking-[0.28em] text-gold-light/70">
                  {item.subtitle}
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-cream/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
