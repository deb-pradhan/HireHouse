/** The seven section grounds and their mandatory ink pairings.
 *  Encodes the design-system pairing law: only black & blue take white text;
 *  lime / yellow / lilac / grey always take black text. A wrong pairing is
 *  unrepresentable because ink is derived from ground, never passed in. */

export type Ground =
  | "black"
  | "white"
  | "grey"
  | "lime"
  | "yellow"
  | "lilac"
  | "blue";

/** Grounds a full-width Section may use. Lilac is DELIBERATELY excluded:
 *  the design system forbids lilac as a background (§2.2, §10) — it is an
 *  accent-block color only. Use it via `bg-lilac` on a card/panel, never a Section. */
export type SectionGround = Exclude<Ground, "lilac">;

export type Tone = "light" | "dark"; // is the ground dark (needs white ink)?

export const GROUND: Record<
  Ground,
  { bg: string; text: string; muted: string; tone: Tone }
> = {
  black: { bg: "bg-black", text: "text-white", muted: "text-muted-dark", tone: "dark" },
  blue: { bg: "bg-blue", text: "text-white", muted: "text-white", tone: "dark" },
  white: { bg: "bg-white", text: "text-black", muted: "text-label", tone: "light" },
  grey: { bg: "bg-grey-bg", text: "text-black", muted: "text-muted-light", tone: "light" },
  lime: { bg: "bg-lime", text: "text-black", muted: "text-muted-light", tone: "light" },
  yellow: { bg: "bg-yellow", text: "text-black", muted: "text-muted-light", tone: "light" },
  lilac: { bg: "bg-lilac", text: "text-black", muted: "text-muted-light", tone: "light" },
};
