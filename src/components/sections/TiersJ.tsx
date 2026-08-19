import { Section, ChipRow, SectionHead, Eyebrow, Caption, Body, Rule } from "@/components/primitives";
import { resolveProof } from "@/lib/proof";
import { accentAt, type TiersJ as Props } from "@/content/types";
import { accentInk } from "./accents";
import { cn } from "@/lib/cn";

/** Three bleeding panels (deck J). Left copy column with an optional stat;
 *  three panels stagger + bleed past the bottom; stack on mobile. */
export function TiersJ({ ground, chips, headline, leftStat, panels, accentSequence }: Props) {
  const stat = leftStat ? resolveProof(leftStat) : null;
  const srcNote = leftStat ? leftStat.sourceNote : undefined;
  const tops = ["lg:mt-0", "lg:mt-[30px]", "lg:mt-[60px]"];
  const count = panels.length;
  return (
    <Section ground={ground} className="lg:!pb-0">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-[60px]">
        {/* left copy column */}
        <div>
          <ChipRow labels={chips} />
          <div className="mt-6 max-w-[26rem]">
            <SectionHead>{headline}</SectionHead>
          </div>
          {stat && (
            <>
              <Rule className="mt-8" />
              <div className="mt-6">
                <p className="t-display">{stat.value}</p>
                <Caption className="mt-2 text-muted-light">{stat.label}</Caption>
                {srcNote && <Caption className="mt-4 text-muted-light">{srcNote}</Caption>}
              </div>
            </>
          )}
        </div>
        {/* three panels, staggered */}
        <div className="grid grid-cols-1 gap-[4px] sm:grid-cols-3">
          {panels.map((p, i) => {
            const accent = accentAt(i, count, accentSequence);
            const ink = accentInk(accent);
            return (
              <div
                key={p.eyebrow}
                className={cn(
                  "rounded-t-[14px] px-[22px] pt-[22px] pb-6 lg:pb-[46px]",
                  tops[i],
                  ink.bg,
                  ink.text,
                  i === count - 1 && "max-lg:mb-[-24px]",
                )}
              >
                <Eyebrow className={ink.sub}>{p.eyebrow}</Eyebrow>
                <Body as="p" className="mt-3">
                  {p.value}
                </Body>
                <Caption className={cn("mt-3", ink.muted)}>{p.caption}</Caption>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
