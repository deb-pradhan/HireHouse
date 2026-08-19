import { Section, ChipRow, SectionHead, BarTitle, Caption, Body, Cta } from "@/components/primitives";
import { resolveProof } from "@/lib/proof";
import { accentAt, type BarsG as Props } from "@/content/types";
import { accentInk } from "./accents";
import { cn } from "@/lib/cn";

/** Bleeding bars (deck G). Bars bleed left from x=0 (sharp rectangles, no
 *  radius), ragged right via content widths, index + title + optional value
 *  line + trailing tag. Optional right column for supporting copy. */
export function BarsG({ ground, chips, headline, bars, rightColumn, closing, accentSequence }: Props) {
  return (
    <Section ground={ground} bare className="!py-[var(--band)]">
      {/* inner container for headline alignment, bars span to viewport edge */}
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <ChipRow labels={chips} />
        {rightColumn && (
          <Caption className="w-full max-w-[220px] text-right text-muted-light lg:w-auto">
            {rightColumn}
          </Caption>
        )}
      </div>
      <div className="mt-6 max-w-[42rem]">
        <SectionHead>{headline}</SectionHead>
      </div>
      <div className="mt-12 flex flex-col gap-[6px]">
        {bars.map((b, i) => {
          const accent = accentAt(i, bars.length, accentSequence);
          const ink = accentInk(accent);
          const tag = b.tag ? resolveProof(b.tag) : null;
          const twoLine = b.valueLine || tag;
          return (
            <div
              key={b.title}
              className={cn(
                "bleed-left flex items-center gap-4 pr-6 pl-[var(--margin)]",
                twoLine ? "py-4" : "py-[22px]",
                ink.bg,
                ink.text,
              )}
              style={{ width: `${b.widthPct}%` }}
            >
              <span className="t-bar shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <BarTitle className="block truncate">{b.title}</BarTitle>
                {twoLine && (
                  <Caption className={cn("block", ink.muted)}>
                    {b.valueLine ?? ""}
                  </Caption>
                )}
              </div>
              {tag && (
                <Caption className={cn("shrink-0", ink.text)}>{tag.value + (tag.label ? ` ${tag.label}` : "")}</Caption>
              )}
            </div>
          );
        })}
      </div>
      {closing && (
        <div className="mt-[26px] flex">
          <Cta href={closing.href} variant="ghost">{closing.label}</Cta>
        </div>
      )}
    </Section>
  );
}
