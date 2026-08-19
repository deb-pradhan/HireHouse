import { Section, ChipRow, SectionHead, CardTitle, Caption, Body } from "@/components/primitives";
import { resolveProof } from "@/lib/proof";
import type { ScorecardD as Props } from "@/content/types";
import { accentInk } from "./accents";
import { cn } from "@/lib/cn";

/** Scorecard / split data (deck D). 58/38: hairline rows left with
 *  right-aligned values; accent/blue summary panel right. Stacks panel-last. */
export function ScorecardD({ ground, chips, headline, subline, rows, panel, footnote }: Props) {
  const stat = resolveProof(panel.bigStat);
  const ink = accentInk(panel.ground);
  return (
    <Section ground={ground}>
      <ChipRow labels={chips} />
      <div className="mt-6 max-w-[42rem]">
        <SectionHead>{headline}</SectionHead>
      </div>
      {subline && <Body className="mt-3 max-w-[58ch] text-muted-light">{subline}</Body>}
      <div className="mt-12 grid grid-cols-1 gap-x-[37px] gap-y-10 lg:grid-cols-[58fr_38fr]">
        {/* hairline data rows */}
        <div className="border-t border-black/15">
          {rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-6 border-b border-black/15 py-4">
              <div className="min-w-0">
                <Body as="span" className="block">{r.label}</Body>
                {r.descriptor && <Caption className="mt-1 text-muted-light">{r.descriptor}</Caption>}
              </div>
              <CardTitle as="span" className="shrink-0 text-right">{r.value}</CardTitle>
            </div>
          ))}
          {footnote && <Caption className="mt-4 text-muted-light">{footnote}</Caption>}
        </div>
        {/* summary panel */}
        <div className={cn("order-first rounded-[14px] p-[22px] lg:order-last", ink.bg, ink.text)}>
          <Caption className={ink.sub}>{panel.label}</Caption>
          <p className="t-hero mt-2">{stat.value}</p>
          <Caption className={cn("mt-4", ink.muted)}>{stat.label}</Caption>
          <Body className={cn("mt-5", ink.text)}>{panel.caption}</Body>
        </div>
      </div>
    </Section>
  );
}
