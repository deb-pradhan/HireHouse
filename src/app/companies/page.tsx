import { SectionRenderer } from "@/components/sections";
import { companiesSections } from "@/content/companies";
import type { Section } from "@/content/types";

/** /companies — employer funnel (accent: employer / blue).
 *  Ordered Section[] rendered via the archetype library.
 *  Copy: docs/content/companies.md */
export const metadata = {
  title: "For companies",
  description:
    "Post a role for free and get a ranked, interview-verified shortlist in days. We source, screen, and run the first interview. You make the decision.",
};

export default function Page() {
  return (
    <div data-accent="employer">
      {companiesSections.map((s: Section, i) => (
        <SectionRenderer key={i} section={s} />
      ))}
    </div>
  );
}
