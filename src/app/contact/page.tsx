import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, ChipRow, Rule, Title, Lead, Eyebrow, Body } from "@/components/primitives";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us who you are and we'll point you the right way. Hiring, job hunting, institutions, partners, and press. Every route reaches a real person.",
};

/** Contact — routing + form. Route-specific layout composed from primitives
 *  (not a pure archetype sequence). Copy: docs/content/supporting.md §/contact. */
export default function Contact() {
  return (
    <div data-accent="candidate">
      <Section ground="white">
        <ChipRow labels={["Contact"]} />
        <div className="mt-6 max-w-[46rem]">
          <Title>Tell us who you are. We&rsquo;ll point you the right way.</Title>
        </div>
        <Lead className="mt-6 max-w-[52ch] text-muted-light">
          Pick the path that fits. Every route reaches a real person, and the free path stays open the whole way.
        </Lead>

        <div className="mt-14">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>

        {/* Where we are — accent panel */}
        <Rule className="mt-16" />
        <div className="mt-10 max-w-[38rem] rounded-[14px] bg-lime p-8 text-black">
          <Eyebrow className="text-black/60">Where we are</Eyebrow>
          <Body className="mt-3">UAE (Dubai) and India. Remote-friendly team.</Body>
        </div>
      </Section>
    </div>
  );
}
