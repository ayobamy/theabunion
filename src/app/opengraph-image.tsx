import { ImageResponse } from "next/og";
import { wedding } from "@/lib/wedding";
import { brand } from "@/lib/brand-tokens";

// Branded link-preview card shown when the site is shared.
// Generated once at build time so it works with `output: export`.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${wedding.names.a} & ${wedding.names.b} — We're Getting Married`;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(160deg, ${brand.forest}, ${brand.forestDeep})`,
        color: brand.cream,
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          fontSize: 26,
          letterSpacing: 14,
          textTransform: "uppercase",
          color: brand.gold,
          marginBottom: 28,
        }}
      >
        We&apos;re getting married
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 132,
          fontWeight: 500,
          color: brand.goldLight,
          lineHeight: 1,
        }}
      >
        {wedding.names.a}
        <span
          style={{
            fontStyle: "italic",
            fontSize: 88,
            margin: "0 28px",
            color: brand.gold,
          }}
        >
          &amp;
        </span>
        {wedding.names.b}
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 30,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: brand.cream,
        }}
      >
        {wedding.dateLabel}
      </div>
    </div>,
    { ...size },
  );
}
