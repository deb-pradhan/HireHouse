"use client";

import { cn } from "@/lib/cn";
import { useGround } from "./GroundContext";

/** The signature eyebrow pill. Fill inverts to the ground:
 *  black fill on light grounds, white fill on dark grounds. */
export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { tone } = useGround();
  return (
    <span
      className={cn(
        "t-chip inline-flex h-[27px] items-center rounded-full px-2",
        tone === "dark" ? "bg-white text-black" : "bg-black text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** One or two adjoining chips (never three — design rule §5.1).
 *  The row is outdented 6px so the chip TEXT lands on the headline margin
 *  (the pill's rounded cap otherwise pushes text inward). §5.1 optical rule. */
export function ChipRow({ labels }: { labels: [string] | [string, string] }) {
  return (
    <div className="-ml-1.5 flex gap-[1px]">
      {labels.map((l) => (
        <Chip key={l}>{l}</Chip>
      ))}
    </div>
  );
}
