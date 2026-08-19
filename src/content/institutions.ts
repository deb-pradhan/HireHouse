import type { Section } from "@/content/types";

/** /institutions — placement cells / TPOs. Copy source: docs/content/institutions.md (final).
 *  Accent: institution (lilac), set via data-accent on the page wrapper.
 *
 *  Ground rotation (no adjacent repeats, exactly one blue at the ask, NO lilac ground):
 *  black → white → grey → white → grey → blue (ask) → white.
 *
 *  Deliberate deviations from the .md, all reversible:
 *  - Hero is BLACK, not the white the .md sketches. HeroA is type-enforced to
 *    `ground: "black"` (golden rule); the institution audience is differentiated
 *    by LILAC ACCENT BLOCKS, never by the hero ground (design system §2.2).
 *  - §5 Cohort reports (ScorecardD) sits on GREY, not the white the .md lists,
 *    so it doesn't repeat the white ground of §4 (FeatureI). The .md's top-line
 *    ground summary also drifts from its per-section labels; this rotation is the
 *    clean reconciliation.
 *  - The single accent/highlight panels use the audience accent LILAC
 *    (FeatureI featureCard, ScorecardD panel) — the .md row-detail says the
 *    ScorecardD panel is blue, but its own ground summary calls it the "lilac
 *    panel"; lilac is chosen to carry the institution identity. Multi-card
 *    sequences (StaggerC, TiersJ) keep the default accent sequence, matching the
 *    established companies.ts pattern.
 *  - ScorecardD requires a `value` per row and a `bigStat`; the .md gives none,
 *    so short structural tags / proof-by-construction claims (no invented stats)
 *    are used, with real:true + identical fallback so nothing placeholder ships. */

export const institutionsSections: Section[] = [
  // 1 · Hero — HeroA · black (audience shown via lilac accent blocks below)
  {
    kind: "hero-a",
    ground: "black",
    eyebrow: "MockHouse for institutions · Batch-ready placements",
    headline: "Get every batch interview-ready, not just the top ten.",
    descriptor:
      "MockHouse runs JD-based mock interviews at batch scale, scores every student, and shows you who's ready, who needs work, and who's at risk, before placement season starts.",
    cta: { label: "Book a demo", href: "/contact?intent=institution" },
    secondaryCta: { label: "See the readiness scale", href: "#readiness" },
    metaLeft: "Batch onboarding",
    metaRight: "UAE · India",
  },

  // 2 · The batch problem — StaggerC · white
  {
    kind: "stagger-c",
    ground: "white",
    chips: ["The problem"],
    headline: "Trainer hours don't stretch to a whole cohort.",
    cards: [
      {
        title: "Too many students, too few trainers.",
        body: "A handful get mock rounds. The rest walk in cold.",
      },
      {
        title: "No early warning.",
        body: "You find out who wasn't ready after they've been rejected.",
      },
      {
        title: "Uneven prep.",
        body: "Practice depends on who booked time, not who needed it most.",
      },
      {
        title: "No picture for leadership.",
        body: "Hard to show readiness or improvement across a batch.",
      },
    ],
  },

  // 3 · Readiness scale — TiersJ · grey (default accent sequence; anchor #readiness)
  {
    kind: "tiers-j",
    id: "readiness",
    ground: "grey",
    chips: ["Readiness at a glance"],
    headline: "Three states, every student sorted.",
    leftStat: {
      value: "Every student.",
      label:
        "Placed on the scale from their mock scores, and moves as they improve.",
      real: true,
      fallback: {
        value: "Every student.",
        label:
          "Placed on the scale from their mock scores, and moves as they improve.",
      },
    },
    panels: [
      {
        eyebrow: "Ready",
        value: "Cleared the bar on skills and interview performance.",
        caption: "Keep them warm.",
      },
      {
        eyebrow: "Needs work",
        value: "Close, with specific gaps.",
        caption: "Targeted remediation, then re-test.",
      },
      {
        eyebrow: "At risk",
        value: "Not yet ready.",
        caption: "Prioritise trainer time here, where it moves the needle.",
      },
    ],
  },

  // 4 · MockHouse B2B — FeatureI · white (lilac feature card)
  {
    kind: "feature-i",
    ground: "white",
    chips: ["What you run"],
    headline: "JD-based mocks, scored and remediated at scale.",
    featureCard: {
      ground: "lilac",
      bigStat: {
        value: "Whole batches.",
        label: "Not samples.",
        real: true,
        fallback: { value: "Whole batches.", label: "Not samples." },
      },
      caption: "Onboard a cohort and run mocks for everyone.",
    },
    items: [
      {
        title: "Batch onboarding.",
        body: "Add a cohort and assign JD-based mocks in bulk.",
      },
      {
        title: "Structured mocks.",
        body: "Real interview questions, scored on a consistent rubric.",
      },
      {
        title: "Trainer override.",
        body: "Your trainers can adjust, add notes, and set remediation.",
      },
      {
        title: "Written feedback.",
        body: "Every student gets a report they can act on.",
      },
    ],
  },

  // 5 · Cohort reports — ScorecardD · grey (lilac highlight panel)
  {
    kind: "scorecard-d",
    ground: "grey",
    chips: ["Reports for leadership"],
    headline: "One dashboard from student to cohort.",
    rows: [
      {
        label: "Per-student readiness",
        descriptor: "Ready / needs work / at risk, with gaps.",
        value: "Per student",
      },
      {
        label: "Cohort view",
        descriptor: "Distribution across the readiness scale.",
        value: "Per batch",
      },
      {
        label: "Improvement over time",
        descriptor: "Movement between mocks.",
        value: "Over time",
      },
      {
        label: "Trainer actions",
        descriptor: "Overrides, notes, and remediation assigned.",
        value: "By trainer",
      },
    ],
    panel: {
      ground: "lilac",
      label: "For leadership",
      bigStat: {
        value: "Student to cohort.",
        label: "One readiness view.",
        real: true,
        fallback: { value: "Student to cohort.", label: "One readiness view." },
      },
      caption:
        "A clear readiness picture per batch, exportable for placement reviews.",
    },
    footnote:
      "Optional: institutions may offer premium features to students, with a free path always kept.",
  },

  // 6 · Book a demo — StatementB · blue (climax, the one blue section)
  {
    kind: "statement-b",
    ground: "blue",
    chips: ["See it live"],
    headline: "Bring your next batch to the season ready.",
    subline:
      "A short demo on your own JDs and cohort structure. No commitment.",
    cards: [
      {
        title: "Batch onboarding.",
        body: "Your whole cohort, in one setup.",
      },
      {
        title: "Readiness reports.",
        body: "Ready / needs work / at risk from day one.",
      },
    ],
    primaryCta: { label: "Book a demo", href: "/contact?intent=institution" },
    secondaryCta: { label: "Explore MockHouse", href: "/mockhouse" },
  },

  // 7 · FAQ — DualK (faq) · white
  {
    kind: "dual-k",
    variant: "faq",
    ground: "white",
    chips: ["Questions"],
    headline: "The straight answers.",
    qa: [
      {
        q: "Who is this for?",
        a: "College placement cells, TPOs, placement trainers, and coaching institutes.",
      },
      {
        q: "How does batch onboarding work?",
        a: "Add a cohort, assign JD-based mocks in bulk, and track readiness from one dashboard.",
      },
      {
        q: "Can our trainers stay in control?",
        a: "Yes. Trainers can override scores, add notes, and set remediation.",
      },
      {
        q: "Do students pay?",
        a: "Institution licensing covers the batch. You may optionally charge students for premium features, with a free path always available.",
      },
      {
        q: "What do reports show leadership?",
        a: "Readiness distribution per cohort and improvement over time.",
      },
      {
        q: "How do we start?",
        a: "Book a demo on your own JDs. We'll set up a pilot cohort.",
      },
    ],
    ctas: [
      { label: "Book a demo", href: "/contact?intent=institution" },
      { label: "Interview-recording consent", href: "/consent" },
    ],
  },
];
