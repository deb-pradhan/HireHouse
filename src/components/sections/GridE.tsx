import { Section, ChipRow, SectionHead, Name, Caption, Body } from "@/components/primitives";
import type { GridE as Props } from "@/content/types";

/** Centred 4-up grid (deck E) — the ONLY centred layout. 3–5 peer entities
 *  of equal weight. Numerals centred; everything else still sentences. */
export function GridE({ ground, chips, headline, subline, items }: Props) {
  return (
    <Section ground={ground}>
      <div className="flex justify-center">
        <ChipRow labels={chips} />
      </div>
      <div className="mx-auto mt-6 max-w-[640px] text-center">
        <SectionHead>{headline}</SectionHead>
      </div>
      <Body className="mx-auto mt-4 max-w-[56ch] text-center text-muted-light">{subline}</Body>
      <div className="mt-14 grid grid-cols-1 gap-x-[6px] gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.numeral} className="text-center">
            <p className="t-display">{it.numeral}</p>
            <Name as="h3" className="mt-4 block">{it.title}</Name>
            <Caption className="mt-2 text-muted-light">{it.body}</Caption>
          </div>
        ))}
      </div>
    </Section>
  );
}
