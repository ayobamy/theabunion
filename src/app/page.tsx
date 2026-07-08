import { Intro } from "@/components/Intro";
import { GoldDust } from "@/components/GoldDust";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { Marquee } from "@/components/Marquee";
import { Verse } from "@/components/Verse";
import { Venue } from "@/components/Venue";
import { SaveTheDate } from "@/components/SaveTheDate";
import { Rsvp } from "@/components/Rsvp";
import { Closing } from "@/components/Closing";

export default function Home() {
  return (
    <>
      <Intro />
      <GoldDust />
      <main id="main" className="relative">
        <Hero />
        <Countdown />
        <Marquee />
        <Verse />
        <Venue />
        <SaveTheDate />
        <Rsvp />
        <Closing />
      </main>
    </>
  );
}
