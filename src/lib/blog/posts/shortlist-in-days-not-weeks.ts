import type { Post } from "../types";

export const post: Post = {
  id: "shortlist-in-days-not-weeks",
  slug: "shortlist-in-days-not-weeks",
  title: "A verified shortlist in days, not weeks of reading CVs.",
  excerpt:
    "A ranked, interview-verified shortlist compresses weeks of manual screening into days. Here is what verified means, and why your team still makes the final call.",
  category: "for-employers",
  author: { name: "The HireHouse team", role: "Editorial" },
  publishedAt: "2026-08-16T09:00:00.000Z",
  cover: {
    src: "https://images.unsplash.com/photo-1573164574511-73c773193279?w=1200&h=675&q=75&auto=format&fit=crop",
    alt: "A hiring team reviewing candidates together",
  },
  body: [
    {
      type: "lead",
      text: "Open a role and the applications arrive faster than anyone can read them. A folder of 300 CVs is not a shortlist. It is a second job for whoever has to open each one, and the role stays open while they do it.",
    },
    {
      type: "p",
      text: "There is a different starting point. Instead of a pile, you get a short, ranked list of people who have already been read on merit and sat a first interview. Your team opens the process where the judgement actually matters, at the decision, not at the sorting.",
    },
    {
      type: "h2",
      id: "what-interview-verified-means",
      text: "What interview-verified actually means",
    },
    {
      type: "p",
      text: "Verified is not a badge we hand out. It is a sequence that happens before anyone reaches your desk, and every candidate goes through the same one.",
    },
    {
      type: "ul",
      items: [
        "**Parsed and ranked on merit.** Each application is read as skills and evidence against the role, not counted for keyword overlap.",
        "**A structured first interview.** The same questions, scored against the same bar, so the shortlist is measured the same way.",
        "**Authenticity checks.** We confirm the person answering is the person applying, and that the answers are their own.",
        "**Then, and only then, a ranked shortlist.** A handful of names, each with the evidence behind the ranking.",
      ],
    },
    {
      type: "p",
      text: "The bar is identical for everyone in the list. Ranking tells you the order the evidence suggests. It does not make the choice. You still read the people, run your own rounds, and decide who to hire.",
    },
    {
      type: "p",
      text: "The difference from the folder of 300 CVs is not that a machine picked your hire. It is that the reading, the first pass, and the first conversation are finished by the time you look. What lands on your desk is a small set of people who cleared the same bar, in order, with the working shown. What you do with that is entirely yours.",
    },
    {
      type: "h2",
      id: "where-the-weeks-go",
      text: "Where the weeks actually go",
    },
    {
      type: "p",
      text: "The slow part of hiring is rarely the final interview. It is everything before it: reading the inbound pile, booking and running first-round screens, and the role sitting open while all of that happens. Those are the drivers. Cut the screening hours and the first-round time, and time-to-fill moves with them.",
    },
    {
      type: "p",
      text: "How many weeks you save depends on volume. A role that drew 40 applications and one that drew 400 do not save the same amount, and we are not going to pretend they do. The honest claim is about the drivers, not a percentage: the reading and the first round are done before you start, so your team spends its hours on the decision.",
    },
    {
      type: "callout",
      text: "This is free for companies. No SaaS fee, no setup, no seat count. You post the role and receive a verified shortlist, and you keep the final call on every hire.",
    },
    {
      type: "quote",
      text: "A shortlist is not the pile made smaller. It is the reading already done, so the decision is the first thing you touch, not the last.",
    },
  ],
};
