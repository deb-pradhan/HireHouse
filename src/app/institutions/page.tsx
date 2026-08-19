import { SectionRenderer } from "@/components/sections";
import { institutionsSections } from "@/content/institutions";
import type { Section } from "@/content/types";

/** /institutions — placement cells / TPOs (accent: institution / lilac).
 *  Ordered Section[] rendered via the archetype library.
 *  Copy: docs/content/institutions.md */
export const metadata = {
  title: "For institutions",
  description:
    "Get every batch interview-ready with JD-based mock interviews, scored at scale, and readiness reports for placement cells and TPOs.",
};

export default function Page() {
  return (
    <div data-accent="institution">
      {institutionsSections.map((s: Section, i) => (
        <SectionRenderer key={i} section={s} />
      ))}
    </div>
  );
}
