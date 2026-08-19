/** Content-driven section model. A page is an ordered `Section[]`; the
 *  `kind` discriminant maps to exactly one archetype component (docs/04).
 *  Grounds are typed `SectionGround` so lilac can never be a section band. */

import type { SectionGround, Ground } from "@/lib/design/ground";
import type { ProofPoint } from "@/lib/proof";

export type Chips = [string] | [string, string];

export type CtaLink = { label: string; href: string };

/** Accent-block ground for a card/bar/panel INSIDE a section (lilac allowed). */
export type Accent = Extract<Ground, "lime" | "lilac" | "yellow" | "blue">;

export const ACCENT_SEQUENCE: Accent[] = ["lime", "lilac", "yellow", "blue"];

/** Resolve the accent for position `i`, honoring §2.3 (sequence may be
 *  truncated so blue is never in the middle — it anchors an end). */
export function accentAt(i: number, count: number, sequence: Accent[] = ACCENT_SEQUENCE): Accent {
  if (count > 1 && sequence.includes("blue")) {
    const bi = sequence.indexOf("blue");
    if (bi < count - 1) return sequence[Math.min(i, bi)];
  }
  return sequence[Math.min(i, sequence.length - 1)];
}

/* ------------------------------------------------------------------ */

export type HeroA = {
  kind: "hero-a";
  ground: Extract<SectionGround, "black">;
  eyebrow: string;
  headline: string;
  descriptor: string;
  cta?: CtaLink;
  secondaryCta?: CtaLink;
  metaLeft?: string;
  metaRight?: string;
};

export type StatementB = {
  kind: "statement-b";
  ground: SectionGround; // blue when it is the page climax (the ask)
  chips: Chips;
  headline: string;
  headlineRole?: "display" | "section";
  subline: string;
  stat?: ProofPoint;
  cards?: { title: string; body: string }[]; // ≤ 2, flat black on the ground
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
};

export type StaggerC = {
  kind: "stagger-c";
  ground: SectionGround;
  chips: Chips;
  headline: string;
  rightNotes?: { title: string; body: string }[];
  cards: { title: string; body: string }[]; // 3–4, index auto-assigned
  accentSequence?: Accent[];
};

export type ScorecardD = {
  kind: "scorecard-d";
  ground: SectionGround;
  chips: Chips;
  headline: string;
  subline?: string;
  rows: { label: string; descriptor?: string; value: string }[];
  panel: { ground: Accent; label: string; bigStat: ProofPoint; caption: string };
  footnote?: string;
};

export type GridE = {
  kind: "grid-e";
  ground: SectionGround;
  chips: Chips;
  headline: string;
  subline: string;
  items: { numeral: string; title: string; body: string }[]; // 3–5 peers
};

export type CompareF = {
  kind: "compare-f";
  ground: SectionGround;
  chips: Chips;
  headline: string;
  dimensions: string[];
  colA: { label: string; cells: string[] }; // plain / the incumbent
  colB: { label: string; cells: string[]; ground: Accent }; // highlighted panel
  closing: string; // rendered with a bold lead-in
};

export type BarsG = {
  kind: "bars-g";
  ground: SectionGround;
  chips: Chips;
  headline: string;
  bars: {
    title: string;
    valueLine?: string;
    tag?: ProofPoint;
    /** ragged-right width as % of the content band, ≥40px spread enforced by copy */
    widthPct: number;
  }[];
  rightColumn?: string;
  closing?: CtaLink;
  accentSequence?: Accent[];
};

export type StatRowH = {
  kind: "stat-row-h";
  ground: SectionGround;
  chips: Chips;
  headline: string;
  headlineRole?: "display" | "section";
  stats: { value: string; label: string }[]; // proof-by-construction tiles
  callout: { leadIn: string; body: string }; // full-width black bar
};

export type FeatureI = {
  kind: "feature-i";
  ground: SectionGround;
  chips: Chips;
  headline: string;
  featureCard: { ground: Accent; bigStat: ProofPoint; caption: string };
  items: { title: string; body: string }[]; // 4, numbered
  footnote?: string;
};

export type TiersJ = {
  kind: "tiers-j";
  ground: SectionGround;
  chips: Chips;
  headline: string;
  leftStat?: ProofPoint & { sourceNote?: string };
  panels: { eyebrow: string; value: string; caption: string }[]; // 3, staggered
  accentSequence?: Accent[];
};

export type DualK =
  | {
      kind: "dual-k";
      variant: "lists";
      ground: SectionGround;
      chips: Chips;
      headline: string;
      left: {
        label: string;
        rows: { name: string; descriptor: string; status?: { label: string; live?: boolean } }[];
      };
      right: { label: string; rows: { title: string; descriptor: string }[]; accent?: Accent };
      ctas?: CtaLink[];
    }
  | {
      kind: "dual-k";
      variant: "faq";
      ground: SectionGround;
      chips: Chips;
      headline: string;
      qa: { q: string; a: string }[];
      ctas?: CtaLink[];
    };

export type ContrastL = {
  kind: "contrast-l";
  ground: SectionGround;
  chips: Chips;
  headline: string;
  subline: string;
  left: { eyebrow: string; title: string; body: string }; // grey-block "incumbent"
  right: { eyebrow: string; title: string; body: string; ground: Accent };
  footnote?: string; // fairness: criteria identical for both
};

export type ClosingM = {
  kind: "closing-m";
  ground: SectionGround;
  brandMark: string;
  headline: string;
  descriptor: string;
  contactGrid?: { label: string; value: string }[];
  shapes?: boolean; // geometric closing composition on ≥ lg
};

type AnySection =
  | HeroA
  | StatementB
  | StaggerC
  | ScorecardD
  | GridE
  | CompareF
  | BarsG
  | StatRowH
  | FeatureI
  | TiersJ
  | DualK
  | ContrastL
  | ClosingM;

/** Every section may carry an optional `id` — a scroll-anchor target for
 *  in-page "see the X" CTAs (rendered by SectionRenderer with scroll-margin).
 *  The intersection distributes over the union, so `kind` narrowing still works. */
export type Section = AnySection & { id?: string };

export type SectionKind = AnySection["kind"];
