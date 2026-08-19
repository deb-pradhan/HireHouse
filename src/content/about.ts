import type { Section } from "@/content/types";

/** About page content — copy source: docs/content/supporting.md §/about (final).
 *  Data-driven: hero-a (black) → stagger-c (white) → closing-m (black).
 *  No fabricated team, funding, or metrics — see the closing note. */

export const aboutSections: Section[] = [
  {
    kind: "hero-a",
    ground: "black",
    eyebrow: "About · A product of Elyts",
    headline: "Hiring should be decided on merit, not keywords.",
    descriptor:
      "HireHouse takes the slow, expensive top of the hiring funnel off companies' hands and gives candidates a fair, fast way to be seen. Built by Elyts, for the UAE and India.",
    metaLeft: "Merit decides. Always.",
    metaRight: "UAE · India",
  },
  {
    kind: "stagger-c",
    ground: "white",
    chips: ["Why we built it"],
    headline: "We got tired of watching good people vanish into filters.",
    cards: [
      {
        title: "For candidates.",
        body: "Every application read on merit, with feedback and assets you keep.",
      },
      {
        title: "For companies.",
        body: "A verified shortlist in days, free, so hiring isn't weeks of manual screening.",
      },
      {
        title: "For institutions.",
        body: "Whole batches interview-ready, with a clear readiness picture.",
      },
      {
        title: "The rule.",
        body: "Merit decides. Speed can be bought; a better score cannot.",
      },
    ],
  },
  {
    kind: "closing-m",
    ground: "black",
    brandMark: "Elyts",
    headline: "Built by Elyts.",
    descriptor:
      "HireHouse and MockHouse are products of Elyts. Learn more at elyts.in. Team, funding, and metrics will be added as they are confirmed, with no placeholder bios or numbers.",
    contactGrid: [
      { label: "Parent company", value: "Elyts · elyts.in" },
      { label: "Markets", value: "UAE & India" },
      { label: "Products", value: "HireHouse, MockHouse, Fast Track" },
      { label: "Contact", value: "hirehouse.xyz/contact" },
    ],
  },
];
