import { Reveal } from "./Reveal";

// Varied frame sizes create the eclectic, scattered collage feel.
// Static class strings so Tailwind keeps them in the build.
const FRAMES = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
];

/** Placeholder gallery — an eclectic, full-bleed mosaic of empty frames. */
export function Gallery() {
  return (
    <section className="relative z-10 py-24 sm:py-32">
      <Reveal className="mb-14 flex flex-col items-center gap-4 px-6 text-center">
        <p className="text-[0.62rem] font-light uppercase tracking-[0.5em] text-cream/45 sm:text-xs">
          Gallery
        </p>
        <h2 className="gold font-serif text-3xl font-light italic sm:text-5xl">
          Moments to come
        </h2>
      </Reveal>

      <Reveal className="w-full px-3">
        <div className="grid grid-flow-dense auto-rows-[60px] grid-cols-4 gap-3 sm:auto-rows-[110px] sm:grid-cols-6 lg:auto-rows-[128px] lg:grid-cols-8">
          {FRAMES.map((span, i) => (
            <div
              key={i}
              className={`${span} rounded-lg border border-gold/15 bg-white/[0.03] shadow-lg shadow-black/20 transition-colors duration-500 hover:border-gold/35`}
            />
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-14 px-6 text-center">
        <p className="font-serif text-lg font-light italic text-cream/55 sm:text-xl">
          Photos coming soon
        </p>
      </Reveal>
    </section>
  );
}
