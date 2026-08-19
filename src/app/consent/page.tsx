import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Interview-recording consent",
  description:
    "How HireHouse handles your interview recordings, in plain language: what we record, why, who can see it, how long we keep it, and your rights.",
};

/** /consent — interview-recording consent policy. First-class, plain-language
 *  (brand doc §12.4). Copy: docs/content/supporting.md §/consent. Linked
 *  wherever recording is mentioned. */
const sections: LegalSection[] = [
  {
    id: "what-we-record",
    heading: "What we record.",
    blocks: [
      {
        type: "p",
        text: "We record structured interview and mock rounds, and only when a video round applies to the role or program you chose. If a role has no video round, there is nothing to record.",
      },
    ],
  },
  {
    id: "why",
    heading: "Why.",
    blocks: [
      {
        type: "p",
        text: "Three reasons, and only these three: to evaluate you fairly against the same criteria as everyone else, to give you feedback you can use, and to share your round with the relevant hiring team.",
      },
    ],
  },
  {
    id: "your-consent",
    heading: "Your consent.",
    blocks: [
      {
        type: "p",
        text: "Recording only happens with your explicit consent, asked for before the round starts. You can decline. If you decline, you can still use the free path for any role where a video round is not required.",
      },
    ],
  },
  {
    id: "who-can-see-it",
    heading: "Who can see it.",
    blocks: [
      {
        type: "p",
        text: "Access is limited to the hiring team for the roles you apply to and our own review team. Your recording is not public, not shared beyond that, and never sold.",
      },
    ],
  },
  {
    id: "how-long-we-keep-it",
    heading: "How long we keep it.",
    blocks: [
      {
        type: "p",
        text: "Recordings are retained under a defined limit and then deleted. You can request deletion at any time, and we act on it.",
      },
    ],
  },
  {
    id: "young-candidates",
    heading: "Young candidates.",
    blocks: [
      {
        type: "p",
        text: "Many of our candidates are 18 to 22. Consent, access control, and retention limits are built in for everyone, not treated as optional extras.",
      },
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights.",
    blocks: [
      {
        type: "p",
        text: "You can request access to your recording, ask us to correct related information, and ask us to delete it, in line with UAE and India rules. To exercise any of these, contact us at privacy@hirehouse.xyz.",
      },
    ],
  },
];

export default function Consent() {
  return (
    <LegalPage
      eyebrow="Interview-recording consent"
      title="How we handle your interview recordings."
      intro="Interview recordings are sensitive, so we keep this policy plain and honest. Here is exactly what happens when a round is recorded."
      sections={sections}
      closing={
        <>
          This is a plain-language summary. The full legal terms live in our{" "}
          <Link href="/terms" className="underline underline-offset-2">
            terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacy policy
          </Link>
          .
        </>
      }
    />
  );
}
