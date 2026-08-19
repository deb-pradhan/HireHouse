import { renderOg } from "@/lib/og/render";

export const runtime = "nodejs";
export const alt = "Jobs — real roles. Apply free, or Fast Track to skip the wait.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Live board",
    title: "Real roles. Apply free, or Fast Track.",
    accent: "candidate",
  });
}
