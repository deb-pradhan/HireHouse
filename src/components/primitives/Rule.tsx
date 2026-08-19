"use client";

import { cn } from "@/lib/cn";
import { useGround } from "./GroundContext";

/** Hairline rule. Alpha derives from the ground:
 *  25% on light, 30% on dark, 35% on blue. Spans full width by default. */
export function Rule({ className }: { className?: string }) {
  const { ground, tone } = useGround();
  const color =
    ground === "blue"
      ? "rgba(255,255,255,0.35)"
      : tone === "dark"
        ? "rgba(255,255,255,0.30)"
        : "rgba(0,0,0,0.25)";
  return (
    <hr
      className={cn("h-px w-full border-0", className)}
      style={{ backgroundColor: color }}
    />
  );
}
