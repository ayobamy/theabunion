import { Intro } from "@/components/Intro";
import { GoldDust } from "@/components/GoldDust";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { Verse } from "@/components/Verse";
import { SaveTheDate } from "@/components/SaveTheDate";
import { Closing } from "@/components/Closing";

export default function Home() {
  return (
    <>
      <Intro />
      <GoldDust />
      <main className="relative">
        <Hero />
        <Countdown />
        <Verse />
        <SaveTheDate />
        <Closing />
      </main>
    </>
  );
}
