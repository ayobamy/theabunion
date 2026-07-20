import { Intro } from "@/components/Intro";
import { GoldDust } from "@/components/GoldDust";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { Marquee } from "@/components/Marquee";
import { Verse } from "@/components/Verse";
import { Schedule } from "@/components/Schedule";
import { Venue } from "@/components/Venue";
import { SaveTheDate } from "@/components/SaveTheDate";
import { Rsvp } from "@/components/Rsvp";
import { Registry } from "@/components/Registry";
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
        <Schedule />
        <Venue />
        <SaveTheDate />
        <Rsvp />
        <Registry />
        <Closing />
      </main>
    </>
  );
}
