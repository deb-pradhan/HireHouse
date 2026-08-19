import type { Job } from "./types";

/** Illustrative fixture roles across families, cities, and levels.
 *
 *  These are clearly illustrative and do NOT represent any real company: we
 *  use generic descriptors ("a Series A fintech") and invented neutral names
 *  ("Meridian Labs"). Some roles carry a salary and some deliberately omit it
 *  so the board and detail pages exercise the "missing salary hides the row"
 *  rule. Dates are recent relative to the site's build.
 *
 *  Data seam: consumed only via `lib/jobs/source.ts`.
 */

export const jobs: Job[] = [
  {
    id: "frontend-engineer-meridian",
    title: "Senior Frontend Engineer",
    company: "Meridian Labs",
    family: "engineering",
    city: "Dubai",
    remote: false,
    level: "senior",
    type: "full-time",
    postedAt: "2026-08-18",
    salary: { min: 28000, max: 38000, currency: "AED" },
    fastTrackEligible: true,
    summary:
      "Build the candidate-facing product surface for a growing hiring platform, working close to design and shipping to production every week.",
    responsibilities: [
      "Own features end to end in a React and TypeScript codebase.",
      "Turn design-system components into accessible, responsive interfaces.",
      "Profile and fix performance issues on real user devices.",
      "Review pull requests and help set frontend conventions.",
    ],
    requirements: [
      "Five or more years building production web apps.",
      "Strong React, TypeScript, and modern CSS.",
      "Comfort with accessibility and Core Web Vitals.",
      "Clear written communication for async work.",
    ],
    companyAbout:
      "Meridian Labs builds recruitment tooling for teams across the Gulf. Small product group, direct access to users.",
  },
  {
    id: "backend-engineer-fintech",
    title: "Backend Engineer",
    company: "a Series A fintech",
    family: "engineering",
    city: "Bengaluru",
    remote: false,
    level: "mid",
    type: "full-time",
    postedAt: "2026-08-16",
    salary: { min: 2800000, max: 4200000, currency: "INR" },
    fastTrackEligible: true,
    summary:
      "Design and run the services behind payments and ledgering for a fast-growing consumer finance product.",
    responsibilities: [
      "Build and operate APIs in Go or Node.",
      "Model money movement with correctness and auditability in mind.",
      "Add observability so on-call is calm, not heroic.",
      "Partner with product on scope and trade-offs.",
    ],
    requirements: [
      "Three or more years on backend services in production.",
      "Solid grasp of databases, queues, and idempotency.",
      "Care for testing and safe rollouts.",
    ],
    companyAbout:
      "A Series A fintech serving retail customers in India, backed to build the next stage of its platform.",
  },
  {
    id: "product-designer-northwind",
    title: "Product Designer",
    company: "Northwind",
    family: "product-design",
    city: "Remote",
    remote: true,
    level: "mid",
    type: "full-time",
    postedAt: "2026-08-15",
    fastTrackEligible: true,
    summary:
      "Shape flows for a B2B analytics product, from first sketch to shipped interface, with a team that treats research as part of the work.",
    responsibilities: [
      "Run discovery and turn findings into clear problem statements.",
      "Design flows, wireframes, and high-fidelity screens.",
      "Contribute to and use the design system.",
      "Pair with engineers through build and QA.",
    ],
    requirements: [
      "A portfolio showing shipped product work.",
      "Fluency in Figma and interaction detail.",
      "Ability to explain design decisions in plain language.",
    ],
    companyAbout:
      "Northwind is a remote-first analytics company. Written culture, quarterly meet-ups.",
  },
  {
    id: "ux-researcher-cobalt",
    title: "UX Researcher",
    company: "Cobalt",
    family: "product-design",
    city: "Abu Dhabi",
    remote: false,
    level: "senior",
    type: "full-time",
    postedAt: "2026-08-11",
    salary: { min: 26000, max: 34000, currency: "AED" },
    fastTrackEligible: false,
    summary:
      "Lead research for a public-sector digital services team, planning studies that decisions actually depend on.",
    responsibilities: [
      "Plan and run qualitative and quantitative studies.",
      "Recruit participants across a wide range of users.",
      "Turn findings into recommendations teams can act on.",
      "Build lightweight research habits across squads.",
    ],
    requirements: [
      "Several years of applied UX research.",
      "Range across interviews, usability testing, and surveys.",
      "Experience influencing roadmaps with evidence.",
    ],
  },
  {
    id: "growth-marketer-kettle",
    title: "Growth Marketing Manager",
    company: "Kettle",
    family: "growth",
    city: "Dubai",
    remote: false,
    level: "mid",
    type: "full-time",
    postedAt: "2026-08-10",
    salary: { min: 22000, max: 30000, currency: "AED" },
    fastTrackEligible: true,
    summary:
      "Own paid and lifecycle channels for a consumer app, running experiments end to end and reporting on what actually moved.",
    responsibilities: [
      "Plan and run acquisition and retention experiments.",
      "Manage budgets across paid channels with clear targets.",
      "Build lifecycle flows with the product team.",
      "Report results honestly, including the misses.",
    ],
    requirements: [
      "Hands-on performance and lifecycle marketing experience.",
      "Comfort with analytics and basic SQL.",
      "A test-and-learn habit, not a channel dogma.",
    ],
    companyAbout:
      "Kettle is a consumer app scaleup growing across the UAE and wider Gulf.",
  },
  {
    id: "content-strategist-remote",
    title: "Content Strategist",
    company: "a developer-tools startup",
    family: "growth",
    city: "Remote",
    remote: true,
    level: "senior",
    type: "contract",
    postedAt: "2026-08-06",
    fastTrackEligible: false,
    summary:
      "Set the editorial direction for a developer-tools brand and produce documentation and articles that engineers trust.",
    responsibilities: [
      "Define content pillars and a publishing rhythm.",
      "Write and edit technical articles and docs.",
      "Work with engineers to get the details right.",
      "Measure what content earns attention and reuse.",
    ],
    requirements: [
      "A track record writing for technical audiences.",
      "Editing range from docs to long-form.",
      "Self-directed on a distributed team.",
    ],
  },
  {
    id: "ops-manager-harbor",
    title: "Operations Manager",
    company: "Harbor Logistics",
    family: "ops",
    city: "Mumbai",
    remote: false,
    level: "senior",
    type: "full-time",
    postedAt: "2026-08-04",
    salary: { min: 3000000, max: 4500000, currency: "INR" },
    fastTrackEligible: true,
    summary:
      "Run daily operations for a logistics scaleup, tightening processes as volume grows without losing service quality.",
    responsibilities: [
      "Own throughput, quality, and cost across a region.",
      "Build and coach a team of coordinators.",
      "Design processes that hold up as volume grows.",
      "Report metrics leadership can act on.",
    ],
    requirements: [
      "Operations leadership in a high-volume environment.",
      "Comfort with data and process design.",
      "Calm under pressure, clear with people.",
    ],
    companyAbout:
      "Harbor Logistics is a logistics scaleup moving goods across western India.",
  },
  {
    id: "people-ops-coordinator-cobalt",
    title: "People Operations Coordinator",
    company: "Cobalt",
    family: "ops",
    city: "Abu Dhabi",
    remote: false,
    level: "junior",
    type: "full-time",
    postedAt: "2026-08-02",
    fastTrackEligible: false,
    summary:
      "Keep the people function running day to day, from onboarding to records, for a team that is hiring steadily.",
    responsibilities: [
      "Coordinate onboarding and offboarding.",
      "Keep records accurate and compliant.",
      "Support scheduling for interviews and reviews.",
      "Answer everyday questions from the team.",
    ],
    requirements: [
      "Strong organisation and follow-through.",
      "Care with confidential information.",
      "Clear, friendly written communication.",
    ],
  },
  {
    id: "data-engineer-intern-meridian",
    title: "Data Engineering Intern",
    company: "Meridian Labs",
    family: "engineering",
    city: "Bengaluru",
    remote: true,
    level: "intern",
    type: "contract",
    postedAt: "2026-07-30",
    fastTrackEligible: true,
    summary:
      "Join the data team for six months and help build the pipelines that feed reporting and product features.",
    responsibilities: [
      "Build and maintain batch data pipelines.",
      "Write tests and documentation for data jobs.",
      "Help investigate data quality issues.",
    ],
    requirements: [
      "Working Python and SQL.",
      "Curiosity about how data moves through systems.",
      "Available for a six-month full-time internship.",
    ],
    companyAbout:
      "Meridian Labs builds recruitment tooling for teams across the Gulf.",
  },
  {
    id: "product-manager-northwind",
    title: "Product Manager",
    company: "Northwind",
    family: "product-design",
    city: "Dubai",
    remote: true,
    level: "senior",
    type: "full-time",
    postedAt: "2026-07-28",
    salary: { min: 32000, max: 42000, currency: "AED" },
    fastTrackEligible: true,
    summary:
      "Own a product area from strategy to delivery, working with design and engineering to ship outcomes, not just features.",
    responsibilities: [
      "Set direction for a product area and defend the trade-offs.",
      "Write clear specs and keep scope honest.",
      "Work with design and engineering through delivery.",
      "Measure impact and decide what to do next.",
    ],
    requirements: [
      "Several years of product management on shipped software.",
      "Comfort with data and with saying no.",
      "Strong writing and stakeholder communication.",
    ],
    companyAbout:
      "Northwind is a remote-first analytics company with a written, low-meeting culture.",
  },
];
