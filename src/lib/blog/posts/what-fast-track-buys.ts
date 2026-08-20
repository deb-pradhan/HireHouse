import type { Post } from "../types";

export const post: Post = {
  id: "what-fast-track-buys",
  slug: "what-fast-track-buys",
  title: "What Fast Track actually buys, and what it does not.",
  excerpt:
    "Fast Track is a one-time priority service. It buys speed and preparation, not a better outcome. Here is the honest line between the two.",
  category: "job-search",
  author: { name: "The HireHouse team", role: "Editorial" },
  publishedAt: "2026-08-17T09:00:00.000Z",
  cover: {
    src: "https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=1200&h=675&q=75&auto=format&fit=crop",
    alt: "A laptop and notebook ready for a job application",
  },
  body: [
    {
      type: "lead",
      text: "Fast Track is a paid tier, so it is fair to ask what your money does. The short answer: it buys speed and preparation, not merit. It moves you through the process faster and sends you in better prepared. It does not touch the bar you are measured against.",
    },
    {
      type: "h2",
      id: "what-it-buys",
      text: "What it buys",
    },
    {
      type: "p",
      text: "Fast Track is a one-time charge of about twenty-five dollars, priced in your local currency. For that, you get a faster, more prepared run at the roles you are already applying for. Concretely, it covers the following.",
    },
    {
      type: "ul",
      items: [
        "**Speed and visibility**: your application is looked at sooner, not scored higher.",
        "**Two mock rounds**: practice interviews before the real one, so the format is not new.",
        "**A structured interview**: the same questions against the same rubric, run properly.",
        "**Written feedback**: specific notes you can act on, whatever the result.",
        "**Assets you keep**: a profile card and an interview video that are yours to reuse.",
        "**A second chance**: if this role is not a fit, three more matched roles at no extra cost.",
      ],
    },
    {
      type: "p",
      text: "Notice what these have in common. Every one of them is about getting you ready and getting you seen. None of them is about the decision itself. The preparation is real, and it helps, because most people interview badly not for lack of ability but for lack of reps. Fast Track gives you the reps.",
    },
    {
      type: "h2",
      id: "what-it-does-not-buy",
      text: "What it does not buy",
    },
    {
      type: "p",
      text: "This is the part we will not soften. Fast Track does not buy a higher score. It does not buy a better ranking. It does not buy a job. The evaluation bar is identical for paid and free candidates, and it is set by the work, not by who paid.",
    },
    {
      type: "p",
      text: "The free path is always there, on every candidate surface, at equal weight. If you never pay a cent, you are read on the same criteria as everyone else. Paying changes how fast you move and how ready you arrive. It does not change the standard you are held to, and it never will.",
    },
    {
      type: "callout",
      text: "If a role is not a fit, that is the honest answer, whether you paid or not. What Fast Track guarantees is not a yes. It is that you leave with feedback and assets, and three more roles lined up.",
    },
    {
      type: "h2",
      id: "even-a-no-pays-off",
      text: "Even a no pays off",
    },
    {
      type: "p",
      text: "Most hiring processes give you silence. You apply, you wait, and nothing comes back that you can use next time. Fast Track is built so the worst case still leaves you better off than when you started.",
    },
    {
      type: "p",
      text: "If the answer is no, you still keep the written feedback, the profile card, and the interview video. You still get three more matched roles. And because the interview was structured and recorded with your consent, the notes are specific enough to act on, not a polite brush-off. That is the point of paying for preparation rather than paying for a result: the preparation is yours no matter how the decision lands.",
    },
    {
      type: "quote",
      text: "You are buying a faster, better-prepared run at the same bar. If we cannot deliver the Fast Track process within 72 hours, you get your money back.",
    },
  ],
};
