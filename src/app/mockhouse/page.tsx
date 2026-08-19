import { SectionRenderer } from "@/components/sections";
import { mockhouseSections } from "@/content/mockhouse";
import type { Section } from "@/content/types";

/** /mockhouse — interview prep, B2C + institution (accent: institution / lilac).
 *  Ordered Section[] rendered via the archetype library.
 *  Copy: docs/content/mockhouse.md */
export const metadata = {
  title: "MockHouse",
  description:
    "JD-based mock interviews with a score and written feedback, so you can prep for a specific role and fix the gaps before the round that counts.",
};

export default function Page() {
  return (
    <div data-accent="institution">
      {mockhouseSections.map((s: Section, i) => (
        <SectionRenderer key={i} section={s} />
      ))}
    </div>
  );
}
