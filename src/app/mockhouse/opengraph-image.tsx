import { renderOg } from "@/lib/og/render";

export const runtime = "nodejs";
export const alt = "MockHouse — practise the real interview before it counts.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "MockHouse",
    title: "Practise the real interview before it counts.",
    accent: "institution",
  });
}
