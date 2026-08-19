import { Section, Rule, Cta, Title, Lead, Caption, Eyebrow } from "@/components/primitives";
import type { HeroA as Props } from "@/content/types";

/** Dark cover / statement (deck A). Page opener: left-anchored headline,
 *  meta row on a hairline. h1 lives here. */
export function HeroA({ ground, eyebrow, headline, descriptor, cta, secondaryCta, metaLeft, metaRight }: Props) {
  return (
    <Section ground={ground} className="!pb-24 !pt-20">
      <Eyebrow className="text-muted-dark">{eyebrow}</Eyebrow>
      <div className="mt-6 max-w-[54rem]">
        <Title>{headline}</Title>
      </div>
      <div className="mt-8 max-w-[52ch]">
        <Lead className="text-muted-dark">{descriptor}</Lead>
      </div>
      {(cta || secondaryCta) && (
        <div className="mt-10 flex flex-wrap gap-3">
          {cta && <Cta href={cta.href}>{cta.label}</Cta>}
          {secondaryCta && (
            <Cta href={secondaryCta.href} variant="ghost">
              {secondaryCta.label}
            </Cta>
          )}
        </div>
      )}
      {(metaLeft || metaRight) && (
        <div className="mt-14">
          <Rule />
          <div className="mt-5 flex flex-wrap gap-x-16 gap-y-3">
            {metaLeft && <Caption className="text-muted-dark">{metaLeft}</Caption>}
            {metaRight && <Caption className="text-muted-dark">{metaRight}</Caption>}
          </div>
        </div>
      )}
    </Section>
  );
}
