import type { Section } from "@/content/types";

/** Partners page content — copy source: docs/content/partners.md (final).
 *  Accent: partner (yellow). Primary CTA: Book a partner call (cal.com, external).
 *  Ground sequence: black → yellow → white → grey → blue (the ask) → white. */

export const partnersSections: Section[] = [
  {
    kind: "hero-a",
    ground: "black",
    eyebrow: "Partners · Turn hiring into a revenue line",
    headline: "Refer companies and candidates. Earn a share.",
    descriptor:
      "If you know teams that are hiring or people looking for work, connect them to HireHouse and earn on the revenue you bring in. Three tiers, clear payouts.",
    cta: { label: "Book a partner call", href: "https://cal.com/hirehouse" },
    secondaryCta: { label: "See the tiers", href: "#ladder" },
    metaLeft: "Revenue share",
    metaRight: "UAE · India",
  },
  {
    kind: "stat-row-h",
    ground: "yellow",
    chips: ["Why partner"],
    headline: "Your network is already worth something. Make it pay.",
    stats: [
      { value: "Free to start.", label: "No cost to become a partner." },
      { value: "Recurring share.", label: "Earn on the revenue your referrals generate." },
      { value: "Both sides count.", label: "Refer companies or candidates." },
      { value: "Opt in from hiring.", label: "Companies can turn their own account into a revenue line." },
    ],
    callout: {
      leadIn: "Turn hiring into a revenue line.",
      body: "Refer, connect, and earn, without changing how you already work.",
    },
  },
  {
    kind: "tiers-j",
    id: "ladder",
    ground: "white",
    chips: ["The ladder"],
    headline: "Three tiers. You climb as you deliver.",
    leftStat: {
      value: "Per agreement.",
      label: "Terms are set in the partner agreement.",
      real: true,
      fallback: { value: "Per agreement.", label: "Terms are set in the partner agreement." },
      sourceNote: "Exact share is confirmed on your call.",
    },
    panels: [
      {
        eyebrow: "Tier one",
        value: "Introducer.",
        caption:
          "Send warm intros to hiring contacts or candidates. Earn on referrals that convert. The easiest way in.",
      },
      {
        eyebrow: "Tier two",
        value: "Growth partner.",
        caption: "Bring volume or manage a set of accounts. A higher share and priority support.",
      },
      {
        eyebrow: "Tier three",
        value: "Strategic partner.",
        caption:
          "Deep, ongoing collaboration across markets. Best terms, co-marketing, and a direct line to the team.",
      },
    ],
  },
  {
    kind: "scorecard-d",
    ground: "grey",
    chips: ["How payouts work"],
    headline: "Clear terms, no guessing.",
    rows: [
      { label: "What you earn on", value: "Revenue from your referrals that convert" },
      { label: "When", value: "Per the payout schedule in your agreement" },
      { label: "How tiers change it", value: "Higher tier, higher share" },
      { label: "Tracking", value: "Attributed to you from the first intro" },
    ],
    panel: {
      ground: "blue",
      label: "On your call",
      bigStat: {
        value: "No fine print.",
        label: "confirmed live, in writing",
        real: true,
        fallback: { value: "No fine print.", label: "confirmed live, in writing" },
      },
      caption: "We confirm your tier, share, and schedule live. No surprises.",
    },
    footnote: "Specific percentages are set in the partner agreement and confirmed before you start.",
  },
  {
    kind: "statement-b",
    ground: "blue",
    chips: ["Get started"],
    headline: "Bring us your network. We’ll sort the rest.",
    subline: "A short call to confirm your tier, your share, and how referrals are tracked.",
    cards: [
      { title: "Free to join.", body: "No cost to become a partner." },
      { title: "Clear payouts.", body: "Confirmed on the call, in writing." },
    ],
    primaryCta: { label: "Book a partner call", href: "https://cal.com/hirehouse" },
    secondaryCta: { label: "Questions first?", href: "/contact?intent=partner" },
  },
  {
    kind: "dual-k",
    variant: "faq",
    ground: "white",
    chips: ["Questions"],
    headline: "The straight answers.",
    qa: [
      {
        q: "Who can be a partner?",
        a: "Brokers, recruiters, community leaders, and companies who want to refer and earn.",
      },
      {
        q: "What do I earn on?",
        a: "A share of the revenue your referrals generate once they convert.",
      },
      {
        q: "How are the tiers different?",
        a: "Higher tiers bring volume or manage accounts and get a higher share and more support.",
      },
      {
        q: "How is my referral tracked?",
        a: "Attributed to you from the first introduction, per your agreement.",
      },
      {
        q: "Can a hiring company also be a partner?",
        a: "Yes. Opt in and turn your hiring account into a revenue line.",
      },
      {
        q: "What are the exact percentages?",
        a: "Set in the partner agreement and confirmed on your call.",
      },
    ],
    ctas: [{ label: "Book a partner call", href: "https://cal.com/hirehouse" }],
  },
];
