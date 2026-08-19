import { renderOg } from "@/lib/og/render";

export const runtime = "nodejs";
export const alt = "For institutions — get every batch interview-ready.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "For institutions",
    title: "Get every batch interview-ready.",
    accent: "institution",
  });
}
