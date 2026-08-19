import { accentAt, ACCENT_SEQUENCE, type Accent } from "@/content/types";
import type { Ground } from "@/lib/design/ground";

/** Ink pairing for an accent block placed INSIDE a section.
 *  Only blue takes white text (§2.4); lime/lilac/yellow take black. */
export function accentInk(groundKey: Extract<Ground, "lime" | "lilac" | "yellow" | "blue">) {
  return groundKey === "blue"
    ? { bg: `bg-${groundKey}`, text: "text-white", muted: "text-white/80", sub: "text-white/70" }
    : {
        bg: `bg-${groundKey}`,
        text: "text-black",
        muted: "text-muted-light",
        sub: "text-black/50",
      };
}

export { accentAt, ACCENT_SEQUENCE };
export type { Accent };
