import { renderOg } from "@/lib/og/render";

export const runtime = "nodejs";
export const alt = "Fast Track — a real answer in 72 hours, or your money back.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Fast Track",
    title: "A real answer in 72 hours, or your money back.",
    accent: "candidate",
  });
}
