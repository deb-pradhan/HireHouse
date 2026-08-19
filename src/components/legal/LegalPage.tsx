import Link from "next/link";
import type { ReactNode } from "react";
import { Section, Rule, Title, SectionHead, Body, Caption, Eyebrow } from "@/components/primitives";

/** Presentational wrapper for the long-form legal pages (/privacy, /terms,
 *  /consent). Single readable column on a white ground, a table-of-contents
 *  anchor list at the top, and a hairline <Rule> between sections.
 *  Design-system anti-patterns still apply: no shadows, gradients, or icons. */

export type LegalBlock =
  | { type: "p"; text: ReactNode }
  | { type: "list"; items: ReactNode[] };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Visible notice at the top, e.g. the TODO(counsel) draft marker. */
  notice?: ReactNode;
  sections: LegalSection[];
  /** Closing note under the last section, e.g. a cross-link to related docs. */
  closing?: ReactNode;
};

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {blocks.map((b, i) =>
        b.type === "p" ? (
          <Body key={i} className="text-muted-light">
            {b.text}
          </Body>
        ) : (
          <ul key={i} className="flex flex-col gap-2">
            {b.items.map((item, j) => (
              <li key={j} className="flex gap-3">
                <span aria-hidden className="mt-[10px] size-[5px] shrink-0 rounded-full bg-black/40" />
                <Body as="span" className="text-muted-light">
                  {item}
                </Body>
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

export function LegalPage({ eyebrow, title, intro, notice, sections, closing }: LegalPageProps) {
  return (
    <div data-accent="candidate">
      <Section ground="white">
        <div className="max-w-[72ch]">
          <Eyebrow className="text-label">{eyebrow}</Eyebrow>
          <div className="mt-5">
            <Title>{title}</Title>
          </div>
          {intro && <Body className="mt-6 text-muted-light">{intro}</Body>}

          {notice && (
            <div className="mt-8 rounded-[14px] bg-grey-bg p-6">
              <Caption className="text-black">{notice}</Caption>
            </div>
          )}

          {/* Table of contents */}
          <nav aria-label="On this page" className="mt-12">
            <Caption className="text-label">On this page</Caption>
            <ol className="mt-4 flex flex-col gap-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <Body as={Link} href={`#${s.id}`} className="text-black underline underline-offset-4">
                    {String(i + 1).padStart(2, "0")}. {s.heading}
                  </Body>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="mt-4">
            {sections.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-28 pt-12">
                <Rule className="mb-8" />
                <SectionHead>{s.heading}</SectionHead>
                <Blocks blocks={s.blocks} />
              </div>
            ))}
          </div>

          {closing && (
            <div className="mt-12">
              <Rule className="mb-8" />
              <Caption className="text-muted-light">{closing}</Caption>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
