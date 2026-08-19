import { cn } from "@/lib/cn";
import { GROUND, type SectionGround } from "@/lib/design/ground";
import { GroundProvider } from "./GroundContext";
import { Container } from "./Container";

type SectionProps = {
  ground: SectionGround;
  /** Render without the inner Container (for full-bleed compositions). */
  bare?: boolean;
  /** Defer offscreen paint. Do NOT set on the first (above-fold) section. */
  belowFold?: boolean;
  id?: string;
  as?: "section" | "header" | "footer" | "div";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

/** A vertical band with one flat ground and its mandatory ink pairing.
 *  overflow-x-clip makes bleed gestures safe (never a page scrollbar). */
export function Section({
  ground,
  bare = false,
  belowFold = false,
  id,
  as: Tag = "section",
  className,
  containerClassName,
  children,
}: SectionProps) {
  const g = GROUND[ground];
  return (
    <GroundProvider ground={ground}>
      <Tag
        id={id}
        className={cn(
          g.bg,
          g.text,
          g.tone === "dark" ? "on-dark" : "on-light",
          "relative overflow-x-clip",
          "py-[var(--band)]",
          belowFold && "below-fold",
          className,
        )}
      >
        {bare ? children : <Container className={containerClassName}>{children}</Container>}
      </Tag>
    </GroundProvider>
  );
}
