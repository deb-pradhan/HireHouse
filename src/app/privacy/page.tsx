import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How HireHouse collects, uses, and protects your data across the UAE and India, including candidate video handling, cross-border transfers, cookies, and your rights.",
};

/** /privacy — long-form legal. Plain-language draft pending counsel review.
 *  Copy structure: docs/content/supporting.md §/privacy. All local-law
 *  specifics carry a TODO(counsel) marker; nothing here is final legal text. */
const sections: LegalSection[] = [
  {
    id: "data-we-collect",
    heading: "Data we collect.",
    blocks: [
      {
        type: "p",
        text: "We collect what you give us and what we need to run the service. We do not sell your data.",
      },
      {
        type: "list",
        items: [
          "Account and profile details you provide, such as your name, email, and the information in your CV.",
          "Application activity: the roles you apply to, your evaluation results, and feedback we generate for you.",
          "Interview recordings, where a video round applies and you have consented. See our interview-recording consent policy.",
          "Payment details for Fast Track, handled by our payment providers, not stored on our own systems.",
          "Basic technical data such as device and usage information, to keep the site working and secure.",
        ],
      },
    ],
  },
  {
    id: "how-we-use-it",
    heading: "How we use it.",
    blocks: [
      {
        type: "list",
        items: [
          "To evaluate applications on merit, using the same criteria for paid and free candidates.",
          "To give you feedback and the assets you keep, such as your profile card and interview video.",
          "To share verified shortlists with the hiring teams for roles you apply to.",
          "To operate, secure, and improve the service, and to meet legal obligations.",
        ],
      },
    ],
  },
  {
    id: "legal-bases",
    heading: "Legal bases.",
    blocks: [
      {
        type: "p",
        text: "We rely on your consent (for interview recordings and marketing), on performing our contract with you (to run your applications and Fast Track), and on our legitimate interests and legal obligations (for security and compliance). TODO(counsel): confirm the exact legal bases and their wording for UAE (PDPL) and India (DPDP Act).",
      },
    ],
  },
  {
    id: "cross-border-transfer",
    heading: "Cross-border transfer.",
    blocks: [
      {
        type: "p",
        text: "HireHouse operates in the UAE and India, so your data may be processed in either country. Payment and related data may flow from India to the UAE depending on how a transaction is routed.",
      },
      {
        type: "p",
        text: "TODO(counsel): confirm the transfer mechanism, safeguards, and disclosures required for UAE and India, and for the India to UAE payment and data flow.",
      },
    ],
  },
  {
    id: "retention",
    heading: "Retention.",
    blocks: [
      {
        type: "p",
        text: "We keep data only as long as we need it for the purposes above, then delete or anonymise it. Interview recordings are held under a defined limit and can be deleted on request. TODO(counsel): set the specific retention periods per data type and market.",
      },
    ],
  },
  {
    id: "cookies-and-consent",
    heading: "Cookies and consent.",
    blocks: [
      {
        type: "p",
        text: "We use essential cookies to run the site and, with your consent, a limited set for analytics. You can decline non-essential cookies without losing access to the free path. TODO(counsel): confirm the cookie inventory and the consent banner wording per market.",
      },
    ],
  },
  {
    id: "candidate-video-handling",
    heading: "Candidate video handling.",
    blocks: [
      {
        type: "p",
        text: "Interview recordings are treated as sensitive. They are taken only with your explicit consent, access is limited to the relevant hiring team and our review team, and they are never public or sold. The full plain-language policy is on our consent page.",
      },
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights.",
    blocks: [
      {
        type: "p",
        text: "You can ask to access, correct, or delete your data, and to withdraw consent, in line with UAE and India rules. TODO(counsel): confirm the full rights list, response timelines, and any local variations.",
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact.",
    blocks: [
      {
        type: "p",
        text: "For any privacy request or question, contact us at privacy@hirehouse.xyz. TODO(counsel): add the registered legal entity, address, and any required data-protection contact for each market.",
      },
    ],
  },
];

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Privacy policy"
      title="Your data, and what we do with it."
      intro="This is a plain-language draft of how HireHouse handles your data across the UAE and India."
      notice={
        <>
          TODO(counsel): This privacy policy is a plain-language draft pending legal review. It is not final legal text
          and must be signed off by local counsel for the UAE and India before it ships.
        </>
      }
      sections={sections}
      closing={
        <>
          Interview recordings are covered in more detail in our{" "}
          <Link href="/consent" className="underline underline-offset-2">
            interview-recording consent policy
          </Link>
          . Service terms live in our{" "}
          <Link href="/terms" className="underline underline-offset-2">
            terms
          </Link>
          .
        </>
      }
    />
  );
}
