import type { Section } from "@/content/types";

/** Fast Track page content — the commercial keystone (candidate accent).
 *  Copy source: docs/content/fast-track.md (final, approved).
 *  Ground rotation: black → lime → grey → white → lime → white → blue → white.
 *  Exactly one blue section (the checkout, §7); no adjacent grounds repeat;
 *  lilac appears only as a card accent, never as a section ground. */

export const fastTrackSections: Section[] = [
  {
    kind: "hero-a",
    ground: "black",
    eyebrow: "Fast Track · Optional priority service",
    headline: "Get a real answer in 72 hours, or your money back.",
    descriptor:
      "Fast Track is a one-time priority review. It buys speed, prep, feedback, and reusable assets. It does not buy a better score, and the free path is always open.",
    cta: { label: "Start Fast Track", href: "/checkout" },
    secondaryCta: { label: "Or apply free", href: "/jobs" },
    metaLeft: "One time. Not a subscription.",
    metaRight: "72h or refund",
  },
  {
    kind: "stagger-c",
    ground: "lime",
    chips: ["What you get"],
    headline: "Everything that gets a busy recruiter to actually look.",
    cards: [
      {
        title: "Reviewed in 72 hours.",
        body: "Auto-screened and validated, no human backlog. Reviewed within 72h or refunded.",
      },
      {
        title: "Two mock rounds first.",
        body: "Practice on MockHouse before the real interview, so you walk in ready.",
      },
      {
        title: "A structured interview.",
        body: "One fair, recorded round with authenticity checks. Your first interview, done.",
      },
      {
        title: "Straight to the manager.",
        body: "If matched, you skip the queue and go to the hiring manager, pre-screened.",
      },
    ],
  },
  {
    kind: "compare-f",
    ground: "grey",
    chips: ["Standard", "Fast Track"],
    headline: "Same evaluation. One just skips the wait.",
    dimensions: [
      "Cost",
      "Screening",
      "Prep",
      "First interview",
      "If matched",
      "If not a fit here",
      "Assets you keep",
      "Evaluation criteria",
    ],
    colA: {
      label: "Standard · Free",
      cells: [
        "Free, always",
        "Manual, when reached",
        "On your own",
        "Scheduled by hand later",
        "Into the normal pipeline",
        "Reapply anytime",
        "Your CV",
        "Identical",
      ],
    },
    colB: {
      label: "Fast Track · $25",
      ground: "lime",
      cells: [
        "$25 one time",
        "Auto + validated in 72h",
        "2 mock rounds included",
        "Structured video, done now",
        "Straight to the hiring manager",
        "3 more matched roles, free",
        "Profile card + video + feedback",
        "Identical",
      ],
    },
    closing:
      "The bar is the same for everyone. Paying moves you up the queue, not up the ranking.",
  },
  {
    kind: "contrast-l",
    ground: "white",
    chips: ["Why this is fair"],
    headline: "Speed is for sale. Merit is not.",
    subline: "Same evaluation, same bar. What changes is speed, never the standard.",
    left: {
      eyebrow: "NEVER",
      title: "It is not a better score.",
      body: "The ranking, the questions, and the bar are identical to the free path. No one buys their way past merit.",
    },
    right: {
      eyebrow: "ALWAYS",
      title: "It is speed, prep, and a second chance.",
      body: "Priority review, mock rounds, feedback you keep, and three more roles if this one isn't the fit.",
      ground: "lime",
    },
    footnote: "Evaluation criteria are identical for the paid and the free path.",
  },
  {
    kind: "stat-row-h",
    ground: "lime",
    chips: ["Our promises"],
    headline: "Promises we can't quietly walk back.",
    stats: [
      { value: "72h or refund.", label: "Miss the window, get your fee back." },
      { value: "Free path stays.", label: "Paid never gates access to a role." },
      { value: "3 more roles.", label: "A safety net if the first isn't a match." },
      { value: "Assets you keep.", label: "Profile, video, feedback. Reusable forever." },
    ],
    callout: {
      leadIn: "Your $25 is never a dead end.",
      body: 'Even a "no" leaves you with feedback and a profile you can reuse.',
    },
  },
  {
    kind: "scorecard-d",
    ground: "white",
    chips: ["The price"],
    headline: "One fee. One review. No lock-in.",
    rows: [
      { label: "What it costs", value: "$25 one time" },
      { label: "What it is", value: "An optional evaluation and priority service" },
      { label: "The free alternative", value: "Apply to any role at no cost" },
      { label: "The guarantee", value: "Reviewed in 72h or refunded" },
    ],
    panel: {
      ground: "blue",
      label: "FAST TRACK",
      bigStat: {
        value: "$25",
        label: "Shown in your local currency (AED / INR) at checkout.",
        real: true,
        fallback: {
          value: "$25",
          label: "Shown in your local currency (AED / INR) at checkout.",
        },
      },
      caption: "One time. Not a subscription. Free path always available.",
    },
    footnote:
      "Price shown in your local currency at checkout. Fast Track is a priority service, not a fee to access any specific employer's role.",
  },
  {
    kind: "statement-b",
    ground: "blue",
    chips: ["Start"],
    headline: "Be first in line for the next 72 hours.",
    subline:
      "Pay once, get reviewed fast, keep the assets. Or apply free, the choice stays yours.",
    cards: [
      { title: "$25 one time.", body: "Localised at checkout. No subscription." },
      { title: "72h or refund.", body: "A real guarantee, not a slogan." },
    ],
    primaryCta: { label: "Continue to checkout", href: "/checkout" },
    secondaryCta: { label: "Apply free instead", href: "/jobs" },
  },
  {
    kind: "dual-k",
    variant: "faq",
    ground: "white",
    chips: ["Questions"],
    headline: "The straight answers.",
    qa: [
      {
        q: "Is this a subscription?",
        a: "No. It's a single one-time fee per Fast Track.",
      },
      {
        q: "What currency will I pay in?",
        a: "AED in the UAE, INR in India. The price is shown before you pay.",
      },
      {
        q: "What does the refund cover?",
        a: "If we don't review you within 72 hours, the fee is refunded.",
      },
      {
        q: "Does Fast Track guarantee a job?",
        a: "No. It guarantees speed, a fair interview, feedback, and assets. Outcomes still depend on merit and the company's decision.",
      },
      {
        q: "Can strong candidates skip it?",
        a: "Yes. The free path gives the same evaluation. Fast Track is for speed, prep, and reusable assets.",
      },
      {
        q: "Who can see my interview video?",
        a: "Only the relevant hiring team, under access control and a retention limit. See the consent page.",
      },
    ],
    ctas: [
      { label: "Continue to checkout", href: "/checkout" },
      { label: "Interview-recording consent", href: "/consent" },
    ],
  },
];
