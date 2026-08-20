import type { Metadata } from "next";
import { Section, ChipRow, Title, Lead, Cta, Caption } from "@/components/primitives";

/** Placeholder for the payment boundary. Real capture is handled by a
 *  market-specific provider (AED/INR) and is not wired in this build.
 *  Kept honest and non-indexed so the Fast Track CTA never dead-ends. */
export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Continue to Fast Track checkout. Fast Track is an optional priority service, and applying to any role stays free.",
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <div data-accent="candidate">
      <Section ground="black">
        <ChipRow labels={["Fast Track"]} />
        <div className="mt-6 max-w-[46rem]">
          <Title>Checkout is not connected in this preview.</Title>
        </div>
        <Lead className="mt-6 max-w-[54ch] text-muted-dark">
          Payments run through our market provider (AED in the UAE, INR in India) and are not live
          in this build. Fast Track stays optional, and applying to any role is free in the meantime.
        </Lead>
        <div className="mt-10 flex flex-wrap gap-3">
          <Cta href="/jobs">Apply to a role, free</Cta>
          <Cta href="/fast-track" variant="ghost">
            Back to Fast Track
          </Cta>
        </div>
        <Caption className="mt-10 text-muted-dark">
          Fast Track is an optional priority service. The free path is always available.
        </Caption>
      </Section>
    </div>
  );
}
