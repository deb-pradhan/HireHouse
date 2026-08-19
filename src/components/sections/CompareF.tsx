import { Fragment } from "react";
import { Section, ChipRow, SectionHead, Caption, Body } from "@/components/primitives";
import type { CompareF as Props } from "@/content/types";
import { accentInk } from "./accents";
import { cn } from "@/lib/cn";

/** Comparison table (deck F). Two options across dimensions. Fairness
 *  invariant: the plain (Standard) column is never visually demoted — same
 *  weight/type as the highlighted panel — and the closing lead-in states
 *  criteria are identical. */
export function CompareF({ ground, chips, headline, dimensions, colA, colB, closing }: Props) {
  const ink = accentInk(colB.ground);
  const sentences = closing.match(/[^.]+(?:\.|$)/g) ?? [closing];
  const leadIn = sentences[0].trim();
  const rest = sentences.slice(1).join("").trim();
  return (
    <Section ground={ground}>
      <ChipRow labels={chips} />
      <div className="mt-6 max-w-[42rem]">
        <SectionHead>{headline}</SectionHead>
      </div>
      <div className="mt-12 overflow-x-auto md:overflow-x-visible">
        <div className="grid min-w-[560px] grid-cols-[170px_1fr_1.25fr] md:grid-cols-[220px_1fr_1.25fr]">
          {/* header */}
          <Caption className="text-muted-light">Compare</Caption>
          <Caption className="text-muted-light">{colA.label}</Caption>
          <div className={cn("rounded-t-[14px] px-6 py-3", ink.bg, ink.text)}>
            <Caption className={ink.text}>{colB.label}</Caption>
          </div>
          {/* rows */}
          {dimensions.map((dim, i) => (
            <Fragment key={dim}>
              <Caption className="border-t border-black/15 py-4 text-muted-light">{dim}</Caption>
              <Body className="border-t border-black/15 py-4">{colA.cells[i] ?? ""}</Body>
              <div className={cn("px-6 py-4", ink.bg, ink.text, i === dimensions.length - 1 && "rounded-b-[14px]")}>
                <Body className={ink.text}>{colB.cells[i] ?? ""}</Body>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <Body className="mt-8 max-w-[64ch] text-muted-light">
        <span className="lead-in">{leadIn}</span> {rest}
      </Body>
    </Section>
  );
}
