import { cn } from "@/lib/cn";

/** Max-width wrapper with the hard left-margin anchor. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("mx-auto w-full px-[var(--margin)]", className)}
      style={{ maxWidth: "calc(var(--content) + var(--margin) * 2)" }}
    >
      {children}
    </div>
  );
}
