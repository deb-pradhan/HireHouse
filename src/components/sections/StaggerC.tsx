import { Section, ChipRow, Rule, SectionHead, CardTitle, Caption, Name } from "@/components/primitives";
import { accentAt, type StaggerC as Props } from "@/content/types";
import { accentInk } from "./accents";
import { cn } from "@/lib/cn";

/** Staggered bleeding columns (deck C, the hero layout). Cards stagger with
 *  a 26px step and bleed past the bottom on ≥ lg; single column on mobile
 *  with the last card under-running. Accent sequence lime→lilac→yellow→blue. */
export function StaggerC({ ground, chips, headline, rightNotes, cards, accentSequence }: Props) {
  const count = cards.length;
  return (
    <Section ground={ground} className="lg:!pb-0">
      <ChipRow labels={chips} />
      {rightNotes?.length ? (
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px] lg:gap-6">
          <div className="max-w-[42rem]">
            <SectionHead>{headline}</SectionHead>
          </div>
          <div className="flex flex-col gap-4 lg:text-right">
            {rightNotes.map((n, i) => (
              <div key={n.title}>
                {i > 0 && <Rule className="mx-0 mb-4 w-full lg:ml-auto lg:w-[70%]" />}
                <Name as="span" className="block">{n.title}</Name>
                <Caption className="mt-1 text-muted-light">{n.body}</Caption>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 max-w-[42rem]">
          <SectionHead>{headline}</SectionHead>
        </div>
      )}
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[6px] lg:pb-0">
        {cards.map((c, i) => {
          const accent = accentAt(i, count, accentSequence);
          const ink = accentInk(accent);
          return (
            <div
              key={i}
              className={cn(
                ink.bg,
                ink.text,
                "rounded-[14px] p-[22px]",
                i < 4 && ["lg:mt-0", "lg:mt-[26px]", "lg:mt-[52px]", "lg:mt-[78px]"][i],
                i === count - 1 && "max-lg:mb-[-22px]",
              )}
            >
              <Caption className={ink.sub}>{String(i + 1).padStart(2, "0")}</Caption>
              <CardTitle className="mt-[22px]">{c.title}</CardTitle>
              <Caption className={cn("mt-[34px]", ink.muted)}>{c.body}</Caption>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
