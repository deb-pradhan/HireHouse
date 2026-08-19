import { renderOg } from "@/lib/og/render";

export const runtime = "nodejs";
export const alt = "Partners — turn hiring into a revenue line.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Partners",
    title: "Turn hiring into a revenue line.",
    accent: "partner",
  });
}
