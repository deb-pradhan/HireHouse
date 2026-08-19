import type { Metadata } from "next";
import { SectionRenderer } from "@/components/sections";
import { sinkSections } from "@/content/kitchenSink";
import type { Section } from "@/content/types";

export const metadata: Metadata = {
  title: "Kitchen Sink · Section Library",
  description: "A live gallery of every archetype in the section library.",
  robots: { index: false, follow: false },
};

/** Internal review route: renders all 13 archetypes in sequence, as a live
 *  gallery of the library. Grounds rotate; blue appears once, at the ask. */
export default function KitchenSink() {
  return (
    <div data-accent="candidate">
      {sinkSections.map((s: Section) => (
        <SectionRenderer key={s.kind} section={s} />
      ))}
    </div>
  );
}
