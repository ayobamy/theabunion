/**
 * Single source of truth for the wedding details.
 * Edit here to change names, date, hashtags, etc. everywhere.
 */

// Month is 0-indexed: 8 = September. Set to the local start time.
const weddingDate = new Date(2026, 8, 12, 10, 0, 0);

export const wedding = {
  names: { a: "Barakah", b: "Ahmad" },
  date: weddingDate,
  dateLabel: "Saturday · September 12, 2026",
  // Shown on the Save-the-Date card; update once confirmed.
  timeLabel: "Time to be announced",
  venueLabel: "Venue to be revealed",
  hashtags: ["#NoorQalbiLoveStory", "#WrappedinBarakah"],
  // Marriage verse — Qur'an 30:21 (Ar-Rum)
  verse:
    "And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy.",
  verseRef: "Qur'an 30:21",
} as const;

export type Wedding = typeof wedding;
