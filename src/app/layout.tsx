import type { Metadata } from "next";
import { Raleway, Cormorant_Garamond, Amiri } from "next/font/google";
import "./globals.css";
import { wedding } from "@/lib/wedding";

const raleway = Raleway({
  variable: "--font-raleway",
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// Used only for the elegant ampersand glyph.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["500", "600"],
  style: ["italic"],
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
      className={`${raleway.variable} ${cormorant.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">{children}</body>
    </html>
  );
}
