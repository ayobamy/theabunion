# The AB Union 💍

A cinematic single-page wedding announcement for **Barokah & Ahmad** —
September 12, 2026.

Built with Next.js + Tailwind + Framer Motion. Forest green · champagne gold ·
cream. Simple, modern, minimalist, elegant — with cool effects.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build & deploy

```bash
npm run build      # static export to ./out
```

The site is a fully static export (`output: "export"`), so it deploys free to
**GitHub Pages**, **Netlify**, or **Vercel** with no server runtime. For Vercel,
just connect the repo. For GitHub Pages / Netlify, publish the `out/` folder.

## Editing the details

Everything lives in one place — [`src/lib/wedding.ts`](src/lib/wedding.ts):
names, monogram initials, date, hashtags, verse, time, venue. Edit there and it
updates everywhere.

- **Colours** → [`src/app/theme.css`](src/app/theme.css) (the single token layer)
- **Countdown target** → the `date` in `src/lib/wedding.ts`
  (month is 0-indexed, so `8` = September)

## What's inside

| Section | File |
| --- | --- |
| Opening curtain (monogram draws itself) | `src/components/Intro.tsx` |
| Ambient gold dust | `src/components/GoldDust.tsx` |
| Hero (kinetic name reveal + parallax) | `src/components/Hero.tsx` |
| Live countdown | `src/components/Countdown.tsx` |
| Marriage verse | `src/components/Verse.tsx` |
| Save the Date + Add to Calendar | `src/components/SaveTheDate.tsx` |
| Closing + hashtags | `src/components/Closing.tsx` |

## Effects

Cinematic intro, gold-foil shimmer on the names with a kinetic letter reveal,
drifting gold dust, scroll-triggered fades, a floating monogram, a live
countdown, and glassmorphism cards — all with full `prefers-reduced-motion`
support.

## Tasteful touches

A small *Bismillah* (in `Hero.tsx`) and the Qur'an 30:21 marriage verse (in
`src/lib/wedding.ts`) are included to fit the theme — remove either if you'd
prefer.

---

\#NoorQalbiLoveStory · \#WrappedinBarakah
