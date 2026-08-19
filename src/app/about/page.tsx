import type { Metadata } from "next";
import { SectionRenderer } from "@/components/sections";
import { aboutSections } from "@/content/about";
import type { Section } from "@/content/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "HireHouse is a merit-first hiring marketplace built by Elyts for the UAE and India. A fair, fast way for candidates to be seen and for companies to hire.",
};

/** About — company. Data-driven Section[] rendered via the archetype library.
 *  Neutral accent kept as candidate (lime) for the page. Copy:
 *  docs/content/supporting.md §/about. */
export default function About() {
  return (
    <div data-accent="candidate">
      {aboutSections.map((s: Section) => (
        <SectionRenderer key={s.kind} section={s} />
      ))}
    </div>
  );
}
