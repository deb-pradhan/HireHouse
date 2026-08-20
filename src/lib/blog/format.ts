import { WPM, type Block, type Post } from "./types";

/** Estimate reading minutes from a post's block text (min 1). */
export function readingMinutes(post: Post): number {
  const words = post.body
    .map((b) => {
      if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
      if (b.type === "divider") return "";
      return (b as { text?: string }).text ?? "";
    })
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WPM));
}

/** e.g. "19 Aug 2026" — stable, locale-independent (no Intl on the server path). */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Collect h2/h3 blocks into a table-of-contents. */
export function tableOfContents(post: Post) {
  return post.body
    .filter((b): b is Extract<Block, { type: "h2" | "h3" }> => b.type === "h2" || b.type === "h3")
    .map((b) => ({ id: b.id, text: b.text, level: b.type === "h2" ? 2 : 3 }));
}
