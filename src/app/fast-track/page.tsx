import { SectionRenderer } from "@/components/sections";
import { fastTrackSections } from "@/content/fastTrack";
import type { Section } from "@/content/types";

/** Fast Track — candidate. The commercial keystone: decision + checkout entry.
 *  Copy: docs/content/fast-track.md */
export const metadata = {
  title: "Fast Track",
  description:
    "An optional priority review of your application: reviewed in 72 hours or refunded, with a free path always open.",
};

export default function Page() {
  return (
    <div data-accent="candidate">
      {fastTrackSections.map((s: Section, i) => (
        <SectionRenderer key={i} section={s} />
      ))}
    </div>
  );
}
