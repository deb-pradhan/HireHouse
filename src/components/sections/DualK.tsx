import { Section, ChipRow, SectionHead, CardTitle, Caption, Body, Name, Eyebrow, Micro, Cta } from "@/components/primitives";
import type { DualK as Props } from "@/content/types";
import { accentInk } from "./accents";
import { cn } from "@/lib/cn";

/** Dual list / FAQ (deck K). Lists = two parallel columns (hairline rows +
    accent rows). FAQ = native <details> zero-JS accordion on hairline rows. */
export function DualK(props: Props) {
  if (props.variant === "faq") return <Faq {...props} />;
  return <Lists {...props} />;
}

function Faq({ ground, chips, headline, qa, ctas }: Extract<Props, { variant: "faq" }>) {
  return (
    <Section ground={ground} belowFold>
      <ChipRow labels={chips} />
      <div className="mt-6">
        <SectionHead>{headline}</SectionHead>
      </div>
      <div className="mt-10 max-w-[820px]">
        {qa.map((item) => (
          <details key={item.q} className="group border-t border-black/15 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
              <CardTitle as="span" className="block">
                {item.q}
              </CardTitle>
              <span className="t-section select-none opacity-40 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <Body className="mt-4 max-w-[64ch] text-muted-light">{item.a}</Body>
          </details>
        ))}
        <div className="border-t border-black/15" />
      </div>
      {ctas?.length ? (
        <div className="mt-12 flex flex-wrap gap-3">
          {ctas.map((c, i) => (
            <Cta key={c.href} href={c.href} variant={i === 0 ? "accent" : "ghost"}>
              {c.label}
            </Cta>
          ))}
        </div>
      ) : null}
    </Section>
  );
}

function Lists({ ground, chips, headline, left, right, ctas }: Extract<Props, { variant: "lists" }>) {
  const accent = accentInk(right.accent ?? "lime");
  return (
    <Section ground={ground}>
      <ChipRow labels={chips} />
      <div className="mt-6 max-w-[42rem]">
        <SectionHead>{headline}</SectionHead>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        {/* Left: hairline rows with name + descriptor + status pill */}
        <div>
          <Eyebrow className="text-muted-light">{left.label}</Eyebrow>
          <div className="mt-4">
            {left.rows.map((r) => (
              <div key={r.name} className="border-t border-black/15 py-4">
                <div className="flex items-center justify-between gap-4">
                  <Body>{r.name}</Body>
                  {r.status && (
                    <span
                      className={cn(
                        "inline-flex h-[18px] shrink-0 items-center rounded-full px-2",
                        r.status.live ? "bg-blue text-white" : "bg-black text-white",
                      )}
                    >
                      <Micro>{r.status.label}</Micro>
                    </span>
                  )}
                </div>
                <Caption className="mt-1 text-muted-light">{r.descriptor}</Caption>
              </div>
            ))}
            <div className="border-t border-black/15" />
          </div>
        </div>
        {/* Right: accent rows */}
        <div>
          <Eyebrow className="text-muted-light">{right.label}</Eyebrow>
          <div className="mt-4 flex flex-col gap-[6px]">
            {right.rows.map((r) => (
              <div
                key={r.title}
                className={cn("flex items-center gap-4 rounded-[14px] px-5 py-3", accent.bg, accent.text)}
              >
                <Name>{r.title}</Name>
                <Micro className={accent.muted}>{r.descriptor}</Micro>
              </div>
            ))}
          </div>
        </div>
      </div>
      {ctas?.length ? (
        <div className="mt-12 flex flex-wrap gap-3">
          {ctas.map((c, i) => (
            <Cta key={c.href} href={c.href} variant={i === 0 ? "accent" : "ghost"}>
              {c.label}
            </Cta>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
