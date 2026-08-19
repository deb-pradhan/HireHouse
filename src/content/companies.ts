import type { Section } from "@/content/types";

/** /companies — employer funnel. Copy source: docs/content/companies.md (final).
 *  Accent: employer (blue), set via data-accent on the page wrapper.
 *  Ground rotation (no adjacent repeats, exactly one blue at the ask, no lilac):
 *  black → grey → white → grey → lime → black → blue (ask) → white.
 *
 *  Note: the approved CTA label reads "Post a role — free" in the .md, but the
 *  em dash breaks golden rule #9 (no em dashes in display copy). Recast with a
 *  comma to "Post a role, free"; meaning and voice preserved. */

export const companiesSections: Section[] = [
  // 1 · Hero — HeroA · black
  {
    kind: "hero-a",
    ground: "black",
    eyebrow: "For companies · No SaaS fee, no setup",
    headline: "The top of your funnel, handled. Free.",
    descriptor:
      "Post a role and get a ranked, interview-verified shortlist in days. We do the sourcing, screening, and first interview. You make the decision.",
    cta: { label: "Post a role, free", href: "/contact?intent=company" },
    secondaryCta: { label: "See how it works", href: "#how-it-works" },
    metaLeft: "No licence. No setup fee.",
    metaRight: "Shortlist in days",
  },

  // 2 · The pain — StaggerC · grey
  {
    kind: "stagger-c",
    ground: "grey",
    chips: ["The cost you don't see"],
    headline: "Most of your hiring budget is spent reading CVs by hand.",
    cards: [
      {
        title: "Screening eats weeks.",
        body: "Someone reads hundreds of CVs per role. That time is the real cost, and it's invisible on the invoice.",
      },
      {
        title: "First rounds don't scale.",
        body: "Manual phone screens bottleneck every pipeline you run.",
      },
      {
        title: "Agencies take a cut.",
        body: "Outsource it and a commission comes off the top of every hire.",
      },
      {
        title: "The seat stays empty.",
        body: "While all of this runs, the role isn't getting done.",
      },
    ],
  },

  // 3 · The 6-step journey — StaggerC · white
  {
    kind: "stagger-c",
    id: "how-it-works",
    ground: "white",
    chips: ["How it works"],
    headline: "Six steps. You only show up for the last one.",
    cards: [
      { title: "Post the role.", body: "Free, in minutes. No contract." },
      {
        title: "We source and read.",
        body: "Every applicant parsed and ranked on merit, not keywords.",
      },
      {
        title: "We interview.",
        body: "A structured video round with authenticity checks.",
      },
      {
        title: "We validate.",
        body: "Skills and fit verified before anyone reaches you.",
      },
      {
        title: "You get a shortlist.",
        body: "Ranked, interview-verified candidates. Not a spreadsheet.",
      },
      { title: "You decide.", body: "The final call is always yours." },
    ],
  },

  // 4 · Shortlist, not spreadsheet — ContrastL · grey
  {
    kind: "contrast-l",
    ground: "grey",
    chips: ["What lands on your desk"],
    headline: "A shortlist, not a spreadsheet of CVs.",
    subline:
      "The same roles, the same candidates. The difference is what reaches your desk.",
    left: {
      eyebrow: "Before",
      title: "A folder of 300 CVs.",
      body: "Hours of manual screening before you even reach a phone call. Strong people buried in the pile.",
    },
    right: {
      eyebrow: "After",
      title: "A ranked, verified shortlist.",
      body: "Interview-verified candidates, scored on merit, ready to talk. You start at the decision.",
      ground: "blue",
    },
  },

  // 5 · Cost drivers — StatRowH · lime (drivers only, never a fabricated figure)
  {
    kind: "stat-row-h",
    ground: "lime",
    chips: ["Where the savings come from"],
    headline: "We don't invent a number. We remove the work that creates the cost.",
    stats: [
      { value: "Screening hours.", label: "Removed from your team's week." },
      { value: "First-round time.", label: "Done before the shortlist reaches you." },
      { value: "Agency commission.", label: "No cut on the hire." },
      { value: "Time-to-fill.", label: "The seat gets filled sooner." },
    ],
    callout: {
      leadIn: "Cost-per-hire is the sum of these.",
      body: "We take the biggest pieces off your plate. What you save depends on your volume, so we show the drivers, not a made-up figure.",
    },
  },

  // 6 · Free model — FeatureI · black
  {
    kind: "feature-i",
    ground: "black",
    chips: ["Why it's free"],
    headline: "Free for companies, and it stays that way.",
    featureCard: {
      ground: "blue",
      bigStat: {
        value: "$0",
        label: "to post",
        real: true,
        fallback: { value: "$0", label: "to post" },
      },
      caption: "No SaaS licence, no setup, no per-seat pricing.",
    },
    items: [
      {
        title: "Cost sits elsewhere.",
        body: "Optional candidate speed and partner revenue fund the platform, not a fee on you.",
      },
      {
        title: "No lock-in.",
        body: "Post one role or twenty. Stop anytime.",
      },
      {
        title: "Opt in to earn.",
        body: "Refer other companies and turn your hiring account into a revenue line.",
      },
      {
        title: "Access vetted talent.",
        body: "Agencies and teams can pull from a pre-vetted, interview-verified pool.",
      },
    ],
  },

  // 7 · The ask — StatementB · blue (climax, the one blue section)
  {
    kind: "statement-b",
    ground: "blue",
    chips: ["Get started"],
    headline: "Post your first role today. It costs nothing.",
    subline:
      "Get a ranked, interview-verified shortlist in days, with no licence and no setup.",
    cards: [
      { title: "$0 to post.", body: "No SaaS fee, ever." },
      { title: "Shortlist in days.", body: "Interview-verified, ranked on merit." },
    ],
    primaryCta: { label: "Post a role, free", href: "/contact?intent=company" },
    secondaryCta: { label: "Talk to us", href: "/contact" },
  },

  // 8 · FAQ — DualK (faq) · white
  {
    kind: "dual-k",
    variant: "faq",
    ground: "white",
    chips: ["Questions"],
    headline: "The straight answers.",
    qa: [
      {
        q: "Is it really free?",
        a: "Yes. No licence, no setup, no per-seat cost to post roles and receive shortlists.",
      },
      {
        q: "How fast is the shortlist?",
        a: "Days, not weeks, depending on applicant volume for the role.",
      },
      {
        q: "How are candidates ranked?",
        a: "On skills and fit via an ELO-style merit score, then a structured interview. Never on keyword matching alone.",
      },
      {
        q: "Do we still make the decision?",
        a: "Always. We hand you a verified shortlist; the hire is your call.",
      },
      {
        q: "What about agencies?",
        a: "Agencies can pull from the pre-vetted pool to cut sourcing time per mandate. Commercial terms on request.",
      },
      {
        q: "Can we earn as a partner?",
        a: "Yes. Opt in to refer companies or candidates and earn a share of revenue. See Partners.",
      },
    ],
  },
];
