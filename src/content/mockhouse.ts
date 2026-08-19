import type { Section } from "@/content/types";

/** /mockhouse — interview prep (B2C + institution). Copy source: docs/content/mockhouse.md (final).
 *  Accent: institution (lilac), set via data-accent on the page wrapper.
 *
 *  Ground rotation (no adjacent repeats, exactly one blue at the bridge, NO lilac ground):
 *  black → white → grey → white → blue (bridge) → white.
 *
 *  Notes / deliberate deviations (all reversible):
 *  - Institution identity is carried by LILAC ACCENT BLOCKS (ContrastL right panel,
 *    ScorecardD panel), never a lilac ground (design system §2.2).
 *  - ContrastL structurally makes the LEFT a neutral grey "incumbent" block and the
 *    RIGHT the single accent panel; the .md marks both individuals and institutions
 *    "accent lilac", but only one panel can carry an accent. Individuals map to the
 *    grey left (the default "you"), institutions to the lilac right (the highlight).
 *    Both panels are equal weight — no greyed-out loser.
 *  - The .md's ScorecardD panel row-detail says blue, but its ground summary calls it
 *    the "lilac panel"; lilac is chosen to carry the institution identity.
 *  - ContrastL requires a subline and ScorecardD requires per-row `value` + a `bigStat`;
 *    the .md omits these, so short structural tags / proof-by-construction claims are
 *    used (no invented stats), with real:true + identical fallback so nothing
 *    placeholder ships. "Two mock rounds" is an existing product fact (see home.ts /
 *    Fast Track), not a fabricated figure.
 *  - Live-app CTAs bridge to the external MockHouse product. The exact URL is not yet
 *    defined in the repo; MOCKHOUSE_APP is a provisional placeholder to confirm. */

const MOCKHOUSE_APP = "https://app.mockhouse.in"; // TODO: confirm live MockHouse app URL

export const mockhouseSections: Section[] = [
  // 1 · Hero — HeroA · black
  {
    kind: "hero-a",
    ground: "black",
    eyebrow: "MockHouse · Interview prep that scores you",
    headline: "Practise the real interview before it counts.",
    descriptor:
      "JD-based mock interviews with a score and written feedback. Prep for a specific role, see where you stand, and fix the gaps before the round that matters.",
    cta: { label: "Start a mock", href: MOCKHOUSE_APP },
    secondaryCta: { label: "For institutions", href: "/institutions" },
    metaLeft: "Free path available",
    metaRight: "Part of Fast Track",
  },

  // 2 · How it works — StaggerC · white
  {
    kind: "stagger-c",
    ground: "white",
    chips: ["How it works"],
    headline: "Paste a JD. Do the interview. Get scored.",
    cards: [
      {
        title: "Pick a role.",
        body: "Paste a job description or choose a track.",
      },
      {
        title: "Interview.",
        body: "A structured mock round, same shape as the real thing.",
      },
      {
        title: "Get a score.",
        body: "Rated on a consistent rubric, not vibes.",
      },
      {
        title: "Read the feedback.",
        body: "Written notes on what to fix, and do it again.",
      },
    ],
  },

  // 3 · B2C / Institution split — ContrastL · grey (lilac right panel)
  {
    kind: "contrast-l",
    ground: "grey",
    chips: ["Two ways to use it"],
    headline: "One for you. One for a whole batch.",
    subline:
      "The same mock engine, whether you're prepping on your own or running a cohort.",
    left: {
      eyebrow: "B2C · For individuals",
      title: "Prep on your own, today.",
      body: "Log in, run JD-based mocks, and track your score. A free path is always available; premium unlocks more rounds and depth.",
    },
    right: {
      eyebrow: "B2B · For institutions",
      title: "Run mocks for the whole cohort.",
      body: "Placement cells onboard batches, score every student, and get readiness reports. See the institutions page.",
      ground: "lilac",
    },
    footnote: "The free path is always available; premium only adds more rounds and depth.",
  },

  // 4 · Score + feedback — ScorecardD · white (lilac highlight panel)
  {
    kind: "scorecard-d",
    ground: "white",
    chips: ["What you get back"],
    headline: "A score you can act on, not a pass/fail.",
    rows: [
      {
        label: "Overall score",
        descriptor: "On a consistent rubric.",
        value: "Scored",
      },
      {
        label: "Strengths",
        descriptor: "What you're already doing well.",
        value: "Named",
      },
      {
        label: "Gaps",
        descriptor: "Specific things to fix, with examples.",
        value: "With examples",
      },
      {
        label: "Next step",
        descriptor: "What to practise before the real round.",
        value: "Actionable",
      },
    ],
    panel: {
      ground: "lilac",
      label: "Part of Fast Track",
      bigStat: {
        value: "Two mock rounds.",
        label: "Included with Fast Track.",
        real: true,
        fallback: { value: "Two mock rounds.", label: "Included with Fast Track." },
      },
      caption:
        "Fast Track includes two mock rounds, so you prep here before your real interview.",
    },
    footnote:
      "Mocks may be recorded for feedback, with your consent and a clear retention policy.",
  },

  // 5 · Bridge to the live app — StatementB · blue (climax, the one blue section)
  {
    kind: "statement-b",
    ground: "blue",
    chips: ["Start prepping"],
    headline: "Your next interview is closer than you think.",
    subline:
      "Run your first JD-based mock now, score it, and fix the gaps before it counts.",
    cards: [
      {
        title: "Free to try.",
        body: "A free path is always open.",
      },
      {
        title: "Built into Fast Track.",
        body: "Two mock rounds come with it.",
      },
    ],
    primaryCta: { label: "Open MockHouse", href: MOCKHOUSE_APP },
    secondaryCta: { label: "Fast Track your application", href: "/fast-track" },
  },

  // 6 · FAQ — DualK (faq) · white
  {
    kind: "dual-k",
    variant: "faq",
    ground: "white",
    chips: ["Questions"],
    headline: "The straight answers.",
    qa: [
      {
        q: "What's a JD-based mock?",
        a: "You paste a real job description and get an interview shaped around it.",
      },
      {
        q: "Is there a free version?",
        a: "Yes. A free path is always available; premium adds more rounds and depth.",
      },
      {
        q: "How is it scored?",
        a: "On a consistent rubric, with written feedback on strengths and gaps.",
      },
      {
        q: "How does it relate to Fast Track?",
        a: "Fast Track includes two MockHouse rounds so you prep before the real interview.",
      },
      {
        q: "Do institutions use the same product?",
        a: "Yes, with batch onboarding, trainer override, and cohort reports. See Institutions.",
      },
      {
        q: "Are mocks recorded?",
        a: "They can be, for feedback, with your consent and a retention limit. See the consent page.",
      },
    ],
    ctas: [
      { label: "Start a mock", href: MOCKHOUSE_APP },
      { label: "Interview-recording consent", href: "/consent" },
    ],
  },
];
