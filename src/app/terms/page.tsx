import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms for using HireHouse, MockHouse, and Fast Track: the optional priority service and its free alternative, 72h-or-refund, payments by market, and no guarantee of outcome.",
};

/** /terms — long-form legal. Plain-language draft pending counsel review.
 *  Copy structure: docs/content/supporting.md §/terms. Carries the fee framing
 *  (optional priority service + free alternative), payments-by-market note, and
 *  the no-guarantee-of-outcome statement. TODO(counsel) marks each sign-off. */
const sections: LegalSection[] = [
  {
    id: "the-service",
    heading: "The service.",
    blocks: [
      {
        type: "p",
        text: "HireHouse is a hiring marketplace. Candidates apply to roles and are evaluated on merit; companies receive verified shortlists. Alongside it we run MockHouse (interview practice) and Fast Track (a paid candidate tier).",
      },
    ],
  },
  {
    id: "optional-priority-service",
    heading: "Fast Track is optional, and the free path is always open.",
    blocks: [
      {
        type: "p",
        text: "Fast Track is an optional evaluation and priority service. It buys speed, visibility, interview prep, feedback, and a second chance. It is not a fee to access any particular employer's role.",
      },
      {
        type: "p",
        text: "There is always a free alternative. Every role can be applied to for free, and the free path is never removed, hidden, or demoted. Evaluation criteria are identical for paid and free candidates.",
      },
    ],
  },
  {
    id: "72h-or-refund",
    heading: "72 hours, or your fee back.",
    blocks: [
      {
        type: "p",
        text: "If you buy Fast Track and we do not review your application within 72 hours, we refund the Fast Track fee. TODO(counsel): confirm the refund mechanism, timing, and any exclusions per market.",
      },
    ],
  },
  {
    id: "payments-by-market",
    heading: "Payments, by market.",
    blocks: [
      {
        type: "list",
        items: [
          "Pricing is market-aware and charged in your local currency: AED in the UAE and INR in India.",
          "Payments are processed by our payment providers under the appropriate model for each market, whether a merchant of record (MoR) or a payment aggregator / cross-border (PA-CB) arrangement.",
          "Taxes apply as required, including GST and any OIDAR treatment for digital services in India.",
        ],
      },
      {
        type: "p",
        text: "TODO(counsel): confirm the payment entity, MoR vs PA-CB boundary, tax handling (GST / OIDAR), and invoicing per market.",
      },
    ],
  },
  {
    id: "no-guarantee-of-outcome",
    heading: "No guarantee of outcome.",
    blocks: [
      {
        type: "p",
        text: "Fast Track changes speed and visibility, never your result. Paying does not improve your score, guarantee an interview, a shortlist, or a job, and does not give you a better ranking. We cannot and do not promise any hiring outcome.",
      },
    ],
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use.",
    blocks: [
      {
        type: "list",
        items: [
          "Give accurate information about yourself and your experience.",
          "Do not impersonate others, submit fraudulent applications, or misuse another person's data.",
          "Do not attempt to disrupt, scrape, or circumvent the security of the service.",
        ],
      },
    ],
  },
  {
    id: "liability",
    heading: "Liability.",
    blocks: [
      {
        type: "p",
        text: "We provide the service with reasonable care but cannot guarantee it is uninterrupted or error-free. TODO(counsel): insert the enforceable limitation-of-liability and warranty-disclaimer wording for each market.",
      },
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law.",
    blocks: [
      {
        type: "p",
        text: "The terms that apply to you depend on the market you use the service in, the UAE or India, each under its own governing law and courts. TODO(counsel): confirm governing law, jurisdiction, and dispute resolution for each market.",
      },
    ],
  },
];

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Terms of service"
      title="The deal, stated plainly."
      intro="This is a plain-language draft of the terms for using HireHouse, MockHouse, and Fast Track across the UAE and India."
      notice={
        <>
          TODO(counsel): These terms are a plain-language draft pending legal review. They are not final legal text and
          must be signed off by local counsel for the UAE and India before they ship.
        </>
      }
      sections={sections}
      closing={
        <>
          How we handle your data is covered in our{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacy policy
          </Link>
          , and interview recordings in our{" "}
          <Link href="/consent" className="underline underline-offset-2">
            interview-recording consent policy
          </Link>
          .
        </>
      }
    />
  );
}
