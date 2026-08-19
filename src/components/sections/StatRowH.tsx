import { Section, ChipRow, Rule, Display, SectionHead, CardTitle, Caption, Body } from "@/components/primitives";
import type { StatRowH as Props } from "@/content/types";

/** Stat row + black callout (deck H). 3–5 proof tiles, hero values are
 *  proof-by-construction (never fabricated — copy gate in the content module). */
export function StatRowH({ ground, chips, headline, headlineRole, stats, callout }: Props) {
  const Head = headlineRole === "section" ? SectionHead : Display;
  return (
    <Section ground={ground}>
      <ChipRow labels={chips} />
      <div className="mt-6 max-w-[44rem]">
        <Head>{headline}</Head>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.value}>
            <Rule />
            <CardTitle className="mt-4">{s.value}</CardTitle>
            <Caption className="mt-3 text-muted-light">{s.label}</Caption>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-[14px] bg-black p-8 text-center text-white">
        <Body>
          <span className="lead-in">{callout.leadIn}</span> {callout.body}
        </Body>
      </div>
    </Section>
  );
}
