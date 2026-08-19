import { renderOg } from "@/lib/og/render";

export const runtime = "nodejs";
export const alt = "HireHouse — Hiring, decided on merit.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "HireHouse", title: "Hiring, decided on merit.", accent: "candidate" });
}
