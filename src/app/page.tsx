import type { Metadata } from "next";
import { SectionRenderer } from "@/components/sections";
import { homeSections } from "@/content/home";
import type { Section } from "@/content/types";

const description =
  "Get read on merit, not keywords. HireHouse hands companies a free, interview-verified shortlist, and gives candidates a fair, fast way to be seen. UAE and India.";

export const metadata: Metadata = {
  title: { absolute: "HireHouse — Hiring, decided on merit." },
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "HireHouse — Hiring, decided on merit.", description, url: "https://hirehouse.xyz" },
  twitter: { card: "summary_large_image", title: "HireHouse — Hiring, decided on merit.", description },
};

/** Home — candidate. Ordered Section[] rendered via the archetype library.
 *  Copy: docs/content/home.md */
export default function Home() {
  return (
    <>
      {homeSections.map((s: Section) => (
        <SectionRenderer key={s.kind} section={s} />
      ))}
    </>
  );
}
