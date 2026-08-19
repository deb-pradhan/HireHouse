import Link from "next/link";
import { cn } from "@/lib/cn";

type CtaProps = {
  href: string;
  variant?: "accent" | "ghost";
  className?: string;
  /** Overrides the auto data-track label (defaults to the string children). */
  track?: string;
  children: React.ReactNode;
};

/** Primary (accent-filled) or secondary (ghost hairline) call to action.
 *  Colors come from the route's --accent; hover inverts. Self-instruments:
 *  stamps a data-track label so the global Analytics delegate captures clicks
 *  (consent-gated) with no per-call wiring. */
export function Cta({ href, variant = "accent", className, track, children }: CtaProps) {
  const external = href.startsWith("http");
  const cls = cn("cta", variant === "accent" ? "cta-accent" : "cta-ghost", className);
  const label = track ?? (typeof children === "string" ? children : undefined);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" data-track={label}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-track={label}>
      {children}
    </Link>
  );
}
