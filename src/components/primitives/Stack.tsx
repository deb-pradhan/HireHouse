import { cn } from "@/lib/cn";

const GAP: Record<number, string> = {
  4: "gap-1",
  8: "gap-2",
  12: "gap-3",
  16: "gap-4",
  20: "gap-5",
  22: "gap-[22px]",
  26: "gap-[26px]",
  30: "gap-[30px]",
  34: "gap-[34px]",
  44: "gap-11",
  46: "gap-[46px]",
  50: "gap-[50px]",
  53: "gap-[53px]",
};

/** Vertical rhythm using only the design system's spacing scale. */
export function Stack({
  gap = 16,
  className,
  children,
}: {
  gap?: keyof typeof GAP | number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", GAP[gap as number] ?? "gap-4", className)}>
      {children}
    </div>
  );
}
