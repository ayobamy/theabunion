import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[0.62rem] font-light uppercase tracking-[0.5em] text-cream/45 sm:text-xs">
        Page not found
      </p>
      <p className="gold mt-8 font-date text-[clamp(4rem,18vw,9rem)] font-light leading-none">
        404
      </p>
      <p className="mt-8 max-w-md font-serif text-lg font-light italic text-cream/70 sm:text-xl">
        This page seems to have wandered off. Let&apos;s get you back.
      </p>
      <Link
        href="/"
        className="mt-10 border-b border-gold/40 pb-1 text-[0.7rem] font-light uppercase tracking-[0.28em] text-gold-light transition-colors duration-300 hover:border-gold"
      >
        Return home
      </Link>
    </main>
  );
}
