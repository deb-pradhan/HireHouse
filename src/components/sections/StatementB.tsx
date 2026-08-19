import { Section, ChipRow, Display, SectionHead, Lead, CardTitle, Caption, Cta } from "@/components/primitives";
import { resolveProof } from "@/lib/proof";
import type { StatementB as Props } from "@/content/types";
import { cn } from "@/lib/cn";

/** Statement + stat + cards (deck B/H) — THE ASK. The single blue section
 *  of a page. White ink; cards flat black on the ground; stat PROOF-gated. */
export function StatementB({ ground, chips, headline, headlineRole, subline, stat, cards, primaryCta, secondaryCta }: Props) {
  const Head = headlineRole === "section" ? SectionHead : Display;
  const resolved = stat ? resolveProof(stat) : null;
  const onBlue = ground === "blue";
  return (
    <Section ground={ground}>
      <ChipRow labels={chips} />
      <div className="mt-6 max-w-[48rem]">
        <Head>{headline}</Head>
      </div>
      <Lead className="mt-5 max-w-[52ch]">{subline}</Lead>
      {resolved && (
        <div className="mt-12">
          <p className="t-hero">{resolved.value}</p>
          <Caption className={cn("mt-3", onBlue ? "text-white/80" : "text-muted-light")}>
            {resolved.label}
          </Caption>
        </div>
      )}
      {cards?.length ? (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-[640px]">
          {cards.slice(0, 2).map((c: { title: string; body: string }) => (
            <div key={c.title} className="rounded-[14px] bg-black p-6 text-white">
              <CardTitle>{c.title}</CardTitle>
              <Caption className="mt-3 text-white/80">{c.body}</Caption>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mt-10 flex flex-wrap gap-3">
        <Cta
          href={primaryCta.href}
          className={onBlue ? "!bg-white !text-blue hover:!bg-black hover:!text-white" : undefined}
        >
          {primaryCta.label}
        </Cta>
        {secondaryCta && (
          <Cta href={secondaryCta.href} variant="ghost">
            {secondaryCta.label}
          </Cta>
        )}
      </div>
    </Section>
  );
}
