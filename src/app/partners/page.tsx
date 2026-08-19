import { SectionRenderer } from "@/components/sections";
import { partnersSections } from "@/content/partners";
import type { Section } from "@/content/types";

/** Partners — partner audience (yellow). Ordered Section[] rendered via the
 *  archetype library. Copy: docs/content/partners.md */
export const metadata = {
  title: "Partners",
  description:
    "Refer companies and candidates to HireHouse and earn a share of the revenue you bring in.",
};

export default function Page() {
  return (
    <div data-accent="partner">
      {partnersSections.map((s: Section, i) => (
        <SectionRenderer key={i} section={s} />
      ))}
    </div>
  );
}
