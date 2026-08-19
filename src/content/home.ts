import type { Section } from "@/content/types";

/** Home page content — copy source: docs/content/home.md (final). */

export const homeSections: Section[] = [
  {
    kind: "hero-a",
    ground: "black",
    eyebrow: "HireHouse · Hiring, decided on merit",
    headline: "Your application deserves a human, not a keyword filter.",
    descriptor:
      "Most CVs die in a filter before anyone reads them. HireHouse reads every application, ranks it on merit, and puts a real shortlist in front of the people who hire.",
    cta: { label: "Fast Track your application", href: "/fast-track" },
    secondaryCta: { label: "Browse open jobs", href: "/jobs" },
    metaLeft: "Free to apply. Always.",
    metaRight: "UAE · India",
  },
  {
    kind: "stagger-c",
    ground: "lime",
    chips: ["The problem"],
    headline: "You did everything right and still heard nothing back.",
    cards: [
      {
        title: "You apply into a black hole.",
        body: "A keyword filter decides in milliseconds. If your words don't match its list, no person ever sees you.",
      },
      {
        title: "No reason, no reply.",
        body: "Weeks pass. You never learn why, so you can't fix it for the next one.",
      },
      {
        title: "Good enough gets missed.",
        body: "Recruiters screen by hand and run out of hours. Strong people slip through because the pile was too tall.",
      },
      {
        title: "The role fills without you.",
        body: "By the time your CV surfaces, the seat is already taken.",
      },
    ],
  },
  {
    kind: "contrast-l",
    ground: "grey",
    chips: ["Two ways in"],
    headline: "The free path is real. Fast Track just skips the wait.",
    subline: "Same evaluation, same bar. Fast Track buys speed and visibility, never a better score.",
    left: {
      eyebrow: "Standard · Free, always",
      title: "Apply free and join the queue.",
      body: "Your application is screened by hand when a recruiter reaches it. It works. It’s just slower, and a busy week can bury a good CV.",
    },
    right: {
      eyebrow: "Fast Track · $25",
      title: "Reviewed in 72 hours, no backlog.",
      body: "Auto-screened and validated in 72h, two mock rounds to prep, a structured interview, then straight to the hiring manager if matched.",
      ground: "blue",
    },
    footnote: "Criteria are identical for both. The free path never disappears.",
  },
  {
    kind: "stat-row-h",
    ground: "white",
    chips: ["Fair by design"],
    headline: "We built the promises in, so we can’t quietly break them.",
    stats: [
      { value: "72h or refund.", label: "Fast Track is reviewed within 72 hours or your fee comes back." },
      { value: "Free path, always.", label: "Every role is applicable for free. Paid never gates access." },
      {
        value: "3 more roles.",
        label: "Score well but not a fit here? We fast-track you into three more matched roles, free.",
      },
      {
        value: "Assets you keep.",
        label: "A profile card, your interview video, and written feedback. Reusable anywhere.",
      },
    ],
    callout: {
      leadIn: "Not pay-to-win.",
      body: "Fast Track buys speed, visibility, prep, feedback, and a second chance. It never buys a better score.",
    },
  },
  {
    kind: "statement-b",
    ground: "blue",
    chips: ["Be seen"],
    headline: "Stop applying into silence.",
    subline: "Fast Track your next application and get a real answer in 72 hours, or your money back.",
    cards: [
      { title: "$25, one time.", body: "Not a subscription. The free path stays open." },
      { title: "Straight to the manager.", body: "If you’re matched, you skip the queue entirely." },
    ],
    primaryCta: { label: "Start Fast Track", href: "/fast-track" },
    secondaryCta: { label: "Or apply free", href: "/jobs" },
  },
  {
    kind: "dual-k",
    variant: "faq",
    ground: "white",
    chips: ["Questions"],
    headline: "The straight answers.",
    qa: [
      {
        q: "Is applying really free?",
        a: "Yes. Every role can be applied to for free, and it always will be. Fast Track is optional.",
      },
      {
        q: "Does paying improve my score?",
        a: "No. Evaluation criteria are identical for paid and free. Fast Track only changes speed and visibility.",
      },
      {
        q: "What is the 72-hour guarantee?",
        a: "If you Fast Track and we don’t review you within 72 hours, we refund the fee.",
      },
      {
        q: "What do I actually keep?",
        a: "A profile card parsed from your CV, your interview video, and a written feedback report. Reuse them on any application.",
      },
      {
        q: "What if I’m good but not right for this role?",
        a: "If you score well, we fast-track you into three more matched roles at no extra cost.",
      },
      {
        q: "What happens to my interview video?",
        a: "It’s stored with your consent, access-controlled, and retained under a clear policy. See our interview-recording consent page.",
      },
    ],
    ctas: [
      { label: "Start Fast Track", href: "/fast-track" },
      { label: "Interview-recording consent", href: "/consent" },
    ],
  },
];
