import { Reveal } from "./Reveal";

// Varied frame sizes create the eclectic, scattered collage feel.
// Static class strings so Tailwind keeps them in the build.
const FRAMES = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
];

/** Placeholder gallery — an eclectic mosaic of empty frames for now. */
export function Gallery() {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 py-24 text-center sm:py-32">
      <Reveal className="flex w-full max-w-4xl flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 px-6">
          <p className="text-[0.62rem] font-light uppercase tracking-[0.5em] text-cream/45 sm:text-xs">
            Gallery
          </p>
          <h2 className="gold font-serif text-3xl font-light italic sm:text-5xl">
            Moments to come
          </h2>
        </div>

        <div className="grid w-full grid-flow-dense auto-rows-[64px] grid-cols-4 gap-3 sm:auto-rows-[104px] sm:gap-4">
          {FRAMES.map((span, i) => (
            <div
              key={i}
              className={`${span} rounded-xl border border-gold/15 bg-white/[0.03] shadow-lg shadow-black/30`}
            />
          ))}
        </div>

        <p className="px-6 font-serif text-lg font-light italic text-cream/55 sm:text-xl">
          Photos coming soon
        </p>
      </Reveal>
    </section>
  );
}
