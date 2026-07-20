/**
 * Single source of truth for the wedding details.
 * Edit here to change names, date, hashtags, etc. everywhere.
 */

// Month is 0-indexed: 8 = September. Set to the local start time.
const weddingDate = new Date(2026, 8, 12, 10, 0, 0);

// Keep in sync with weddingDate above — drives the Order-of-the-day
// card, the Save-the-Date card, and the calendar invite.
const celebrationStart = "10:00 AM";

export const wedding = {
  names: { a: "Barokah", b: "Ahmad" },
  date: weddingDate,
  dateLabel: "Saturday · September 12, 2026",
  // Shown on the Save-the-Date card.
  timeLabel: `Begins at ${celebrationStart}`,
  venueLabel: "Abibat Mogaji Hall · Oshodi, Lagos",
  hashtags: ["#NoorQalbiLoveStory", "#WrappedinBarakah"],

  // The venue. mapsQuery drives the embedded map + directions link.
  venue: {
    name: "Abibat Mogaji Hall",
    address: [
      "No. 1 Oyetayo Street, Oshodi",
      "Oshodi Local Govt. Council",
      "Lagos State",
    ],
    mapsQuery: "Abibat Mogaji Hall, Oyetayo Street, Oshodi, Lagos",
  },

  // Order of the day — Nikah (solemnisation) then Walimah (feast),
  // both held together on the day, beginning at 10:00 AM.
  celebrationStart,
  schedule: [
    {
      name: "Nikah",
      subtitle: "The solemnisation",
      description:
        "The marriage covenant — the offer and acceptance before family and witnesses, blessed with prayer.",
    },
    {
      name: "Walimah",
      subtitle: "The wedding feast",
      description:
        "The reception that follows — a celebration and feast shared with loved ones, in the tradition of the Sunnah.",
    },
  ],

  // Gift registry — a bank transfer for well-wishers who ask.
  registry: {
    bank: "Moniepoint",
    accountName: "Ahmodu Olawale Ahmed",
    accountNumber: "8152344126",
  },
  // Marriage verse — Qur'an 30:21 (Ar-Rum)
  verse:
    "And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy.",
  verseRef: "Qur'an 30:21",
} as const;

export type Wedding = typeof wedding;
