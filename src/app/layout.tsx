import type { Metadata } from "next";
import { Raleway, Cormorant_Garamond, Fraunces, Amiri } from "next/font/google";
import "./globals.css";
import { wedding } from "@/lib/wedding";

const raleway = Raleway({
  variable: "--font-raleway",
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// Elegant serif — used for the ampersand glyph.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["500", "600"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
});

// High-contrast serif — used for the date + countdown numbers.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

const title = `${wedding.names.a} & ${wedding.names.b} — We're Getting Married`;
const description = `Join us as we celebrate our union · ${wedding.dateLabel}. ${wedding.hashtags.join(" ")}`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${cormorant.variable} ${fraunces.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">
        {/* Subtle noise overlay for film grain texture */}
        <div
          className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
