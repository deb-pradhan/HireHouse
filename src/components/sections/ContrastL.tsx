import { Section, ChipRow, SectionHead, CardTitle, Caption, Body, Eyebrow } from "@/components/primitives";
import type { ContrastL as Props } from "@/content/types";
import { accentInk } from "./accents";
import { cn } from "@/lib/cn";

/** Contrast pair (deck L): us vs them, Standard vs Fast Track. Fairness
 *  invariant — both panels same size; the free/Standard panel is a positive
 *  frame, never the greyed-out loser; the footnote states criteria match. */
export function ContrastL({ ground, chips, headline, subline, left, right, footnote }: Props) {
  const ink = accentInk(right.ground);
  return (
    <Section ground={ground}>
      <ChipRow labels={chips} />
      <div className="mt-6 max-w-[42rem]">
        <SectionHead>{headline}</SectionHead>
      </div>
      <Body className="mt-4 max-w-[60ch] text-muted-light">{subline}</Body>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Standard / incumbent — equal weight, positive frame */}
        <div className="rounded-[14px] bg-grey-block p-8">
          <Eyebrow className="text-muted-light">{left.eyebrow}</Eyebrow>
          <CardTitle className="mt-5">{left.title}</CardTitle>
          <Body className="mt-4 text-muted-light">{left.body}</Body>
        </div>
        {/* You / the highlighted option */}
        <div className={cn("rounded-[14px] p-8", ink.bg, ink.text)}>
          <Eyebrow className={ink.muted}>{right.eyebrow}</Eyebrow>
          <CardTitle className="mt-5">{right.title}</CardTitle>
          <Body className={cn("mt-4", ink.muted)}>{right.body}</Body>
        </div>
      </div>
      {footnote && (
        <Caption className="mt-6 text-muted-light">{footnote}</Caption>
      )}
    </Section>
  );
}
