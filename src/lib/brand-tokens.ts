/**
 * Brand colour literals for contexts that can't read CSS variables —
 * e.g. the generated Open Graph share image (next/og runs in isolation).
 * Keep these in sync with src/app/theme.css.
 */
export const brand = {
  forest: "#0C2419",
  forestDeep: "#0B1A14",
  gold: "#C6A664",
  goldLight: "#E7D2A0",
  cream: "#FAF7F0",
} as const;
