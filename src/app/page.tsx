import { SectionRenderer } from "@/components/sections";
import { homeSections } from "@/content/home";
import type { Section } from "@/content/types";

/** Home — candidate. Ordered Section[] rendered via the archetype library.
 *  Copy: docs/content/home.md */
export default function Home() {
  return (
    <>
      {homeSections.map((s: Section) => (
        <SectionRenderer key={s.kind} section={s} />
      ))}
    </>
  );
}
