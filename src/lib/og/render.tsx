import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Shared Open Graph image renderer — Editorial Brutalist: black ground,
 *  accent pill eyebrow, big ExtraLight headline, wordmark. Manrope woff comes
 *  from @fontsource (Satori supports woff, not woff2). Node runtime required. */

const FONT_DIR = join(process.cwd(), "node_modules/@fontsource/manrope/files");
const light = readFileSync(join(FONT_DIR, "manrope-latin-200-normal.woff"));
const bold = readFileSync(join(FONT_DIR, "manrope-latin-700-normal.woff"));

const ACCENTS = {
  candidate: { bg: "#E9FEA3", ink: "#000000" },
  employer: { bg: "#4C49F3", ink: "#FFFFFF" },
  institution: { bg: "#CB9FD2", ink: "#000000" },
  partner: { bg: "#FBFD78", ink: "#000000" },
} as const;

export type OgAccent = keyof typeof ACCENTS;

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOg({
  eyebrow,
  title,
  accent = "candidate",
}: {
  eyebrow: string;
  title: string;
  accent?: OgAccent;
}) {
  const a = ACCENTS[accent];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: 80,
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: a.bg,
              color: a.ink,
              borderRadius: 999,
              padding: "12px 26px",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 200,
            color: "#FFFFFF",
            letterSpacing: "-0.04em",
            lineHeight: 1.03,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 42, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.03em" }}>
            HireHouse
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9A9A9A" }}>Hiring, decided on merit.</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Manrope", data: light, weight: 200, style: "normal" },
        { name: "Manrope", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
