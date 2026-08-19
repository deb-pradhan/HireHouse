import { renderOg } from "@/lib/og/render";

export const runtime = "nodejs";
export const alt = "For companies — the top of your funnel, handled. Free.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "For companies",
    title: "The top of your funnel, handled. Free.",
    accent: "employer",
  });
}
