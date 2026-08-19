import { Section, Rule, Hero, Name, Caption, Body } from "@/components/primitives";
import type { ClosingM as Props } from "@/content/types";

/** Closing / contact / legal (deck M). Brand mark → Hero headline → descriptor
 *  → hairline → 2×2 contact grid. On ≥ lg a flat geometric composition sits
 *  in the right 40%. Legal variant: a single readable column. */
export function ClosingM({ ground, brandMark, headline, descriptor, contactGrid, shapes = true }: Props) {
  return (
    <Section ground={ground} className="lg:!pr-0">
      <div className="relative">
        <Name as="p" className="font-bold">
          {brandMark}
        </Name>
        <div className="mt-6 max-w-[40rem]">
          <Hero>{headline}</Hero>
        </div>
        <Body className="mt-5 max-w-[60ch] text-muted-light">{descriptor}</Body>
        {contactGrid?.length ? (
          <>
            <Rule className="mt-12" />
            <div className="mt-8 grid grid-cols-1 gap-x-[155px] gap-y-[46px] sm:grid-cols-2 lg:max-w-[65%]">
              {contactGrid.map((c) => (
                <div key={c.label}>
                  <Caption className="text-label">{c.label}</Caption>
                  <Body className="mt-1">{c.value}</Body>
                </div>
              ))}
            </div>
          </>
        ) : null}
        {/* geometric composition — right 40%, flat overlapping shapes, ≥ lg */}
        {shapes && (
          <div aria-hidden className="pointer-events-none absolute right-0 top-0 hidden lg:block">
            <div className="relative h-[260px] w-[340px]">
              <div className="absolute right-[80px] top-[20px] size-[160px] bg-lime" />
              <div className="absolute right-[40px] top-[80px] size-[180px] rounded-full bg-blue" />
              <div className="absolute right-[140px] top-[120px] size-[110px] rounded-[14px] bg-lilac" />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
