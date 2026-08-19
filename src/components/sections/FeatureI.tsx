import { Section, ChipRow, Rule, SectionHead, CardTitle, Caption, Name } from "@/components/primitives";
import { resolveProof } from "@/lib/proof";
import type { FeatureI as Props } from "@/content/types";
import { accentInk } from "./accents";
import { cn } from "@/lib/cn";

/** Feature card + 4-up (deck I). One dominant stat + 4 supporting numbered
 *  reasons. Accent card top-right; numbered items on a row below. */
export function FeatureI({ ground, chips, headline, featureCard, items, footnote }: Props) {
  const stat = resolveProof(featureCard.bigStat);
  const ink = accentInk(featureCard.ground);
  return (
    <Section ground={ground}>
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div className="max-w-[34rem]">
          <ChipRow labels={chips} />
          <div className="mt-6">
            <SectionHead>{headline}</SectionHead>
          </div>
        </div>
        {/* accent feature card */}
        <div className={cn("w-full max-w-[280px] rounded-[14px] p-[22px] sm:w-auto", ink.bg, ink.text)}>
          <p className="t-display">{stat.value}</p>
          <Caption className={cn("mt-2", ink.muted)}>{stat.label}</Caption>
          <Name as="p" className="mt-4">{featureCard.caption}</Name>
        </div>
      </div>
      {/* numbered items */}
      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.title}>
            <Rule />
            <Caption className="mt-3 text-muted-light">{String(i + 1).padStart(2, "0")}</Caption>
            <Name as="h3" className="mt-2 block">
              {it.title}
            </Name>
            <Caption className="mt-2 text-muted-light">{it.body}</Caption>
          </div>
        ))}
      </div>
      {footnote && (
        <div className="mt-8">
          <Caption className="text-muted-light">{footnote}</Caption>
        </div>
      )}
    </Section>
  );
}
