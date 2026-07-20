"use client";

import { Reveal } from "./Reveal";
import { wedding } from "@/lib/wedding";

const EVENT_TITLE = `${wedding.names.a} & ${wedding.names.b}'s Wedding`;
const EVENT_LOCATION = `${wedding.venue.name}, ${wedding.venue.address.join(", ")}`;

// Escape text for an iCalendar value (RFC 5545).
function esc(s: string): string {
  return s.replace(/[\\,;]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
}

// Timed event: begins at wedding.date (10:00 AM). The wrap-up hour is
// an assumption — adjust EVENT_END_HOUR if the day runs longer.
const EVENT_END_HOUR = 16; // 4:00 PM

function eventEnd(): Date {
  const end = new Date(wedding.date);
  end.setHours(EVENT_END_HOUR, 0, 0, 0);
  return end;
}

function icsDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

// Floating local time — the celebration is local to Lagos; the Google
// link pins the zone via ctz.
function icsDateTime(d: Date): string {
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${icsDate(d)}T${h}${min}00`;
}

function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${icsDateTime(wedding.date)}/${icsDateTime(eventEnd())}`,
    ctz: "Africa/Lagos",
    location: EVENT_LOCATION,
    details: `Begins at ${wedding.celebrationStart} · ${wedding.hashtags.join(" ")}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadIcs() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//theabunion//wedding//EN",
    "BEGIN:VEVENT",
    `UID:${icsDate(wedding.date)}-abunion@wedding`,
    `DTSTART:${icsDateTime(wedding.date)}`,
    `DTEND:${icsDateTime(eventEnd())}`,
    `SUMMARY:${esc(EVENT_TITLE)}`,
    `LOCATION:${esc(EVENT_LOCATION)}`,
    `DESCRIPTION:${esc(`Begins at ${wedding.celebrationStart} · ${wedding.hashtags.join(" ")}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([lines], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "barokah-and-ahmad.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function SaveTheDate() {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 py-32 text-center sm:py-44">
      <Reveal className="flex flex-col items-center">
        <p className="text-[0.62rem] font-light uppercase tracking-[0.5em] text-cream/45 sm:text-xs">
          Save the date
        </p>
        <p className="gold mt-8 font-date text-[clamp(3rem,12vw,6rem)] font-light leading-none">
          12.09.26
        </p>
        <p className="mt-6 text-[0.72rem] font-light uppercase tracking-[0.34em] text-cream/70 sm:text-sm">
          {wedding.dateLabel}
        </p>
        <div className="mt-4 flex flex-col gap-1 text-sm font-light text-cream/45">
          <span>{wedding.timeLabel}</span>
          <span>{wedding.venueLabel}</span>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gold/40 bg-white/5 px-8 py-4 text-[0.7rem] font-light uppercase tracking-[0.28em] text-gold-light backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-white/10 hover:shadow-lg hover:shadow-gold/10 active:scale-[0.98]"
          >
            Add to Google Calendar
          </a>
          <button
            type="button"
            onClick={downloadIcs}
            className="rounded-full border border-cream/20 bg-white/5 px-8 py-4 text-[0.7rem] font-light uppercase tracking-[0.28em] text-cream/70 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cream/60 hover:bg-white/10 hover:text-cream hover:shadow-lg hover:shadow-cream/5 active:scale-[0.98]"
          >
            Download invite
          </button>
        </div>
      </Reveal>
    </section>
  );
}
