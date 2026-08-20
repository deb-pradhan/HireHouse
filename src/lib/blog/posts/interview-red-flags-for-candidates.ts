import type { Post } from "../types";

export const post: Post = {
  id: "interview-red-flags-for-candidates",
  slug: "interview-red-flags-for-candidates",
  title: "The interview is testing them too: red flags worth watching.",
  excerpt:
    "An interview runs both ways. While a company reads you, it is also showing you how it treats people. Here is what to watch, and what a good process looks like.",
  category: "interview-prep",
  author: { name: "The HireHouse team", role: "Editorial" },
  publishedAt: "2026-08-09T09:00:00.000Z",
  cover: {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=675&q=75&auto=format&fit=crop",
    alt: "Two people shaking hands after a meeting",
  },
  body: [
    {
      type: "lead",
      text: "It is easy to walk into an interview thinking you are the only one being judged. You are not. While the company reads you, it is also showing you, in small ways, how it treats the people who work there. The trick is to notice the tells while you are still free to walk away.",
    },
    {
      type: "h2",
      id: "what-to-watch-for",
      text: "What to watch for",
    },
    {
      type: "p",
      text: "None of these are catastrophes on their own. A single awkward moment is not a verdict. What you are looking for is a **pattern**, because a pattern is data about how the place actually runs.",
    },
    {
      type: "ul",
      items: [
        "No clear structure, or the same story from three interviewers. If nobody can say what the role is, or if each person describes a different job, the company has not agreed with itself. You would be joining that confusion.",
        "Vague answers about the role or the money. If a straight question about scope, level, or pay gets a soft non-answer, take note. Teams that are fair usually find it easy to be specific.",
        "Disrespect for your time. Constant reschedules, long silences between rounds, ghosting after a strong conversation. How a company treats a candidate is a preview of how it treats a junior employee.",
        "An interviewer who has not read your CV. It says the hire is not a priority, or that people here do not prepare for each other. Neither is a good sign.",
        "Pressure to decide on the spot. A real offer survives a night's sleep. Urgency used as a lever is a tactic, not a compliment.",
        "No room for your questions. If the last five minutes are rushed or skipped, the message is that your side of the decision does not matter.",
      ],
    },
    {
      type: "h2",
      id: "one-moment-versus-a-pattern",
      text: "One moment versus a pattern",
    },
    {
      type: "p",
      text: "Be fair to them. Interviewers get nervous too. A calendar slips, a manager joins late, a question lands badly. Any of that can happen on a good team on a bad week. So do not hang a decision on one wobble. Hang it on repetition. When the same problem shows up in round after round, you are no longer seeing an accident. You are seeing the culture.",
    },
    {
      type: "callout",
      text: "One awkward moment is not a verdict. A pattern is. Watch how the small things repeat, not whether they ever happen.",
    },
    {
      type: "h2",
      id: "what-a-good-process-looks-like",
      text: "What a good process looks like",
    },
    {
      type: "p",
      text: "The counter-signals are just as easy to read once you know to look. A good process tells you the steps up front and roughly how long each will take. It states a timeline for a decision and keeps to it. It gives feedback in writing when it can. The questions are consistent, so you are measured against the role and not against the mood in the room.",
    },
    {
      type: "quote",
      text: "The way a company interviews you is the clearest free sample of how it will manage you. Take the sample seriously.",
    },
    {
      type: "p",
      text: "You are allowed to leave with questions of your own answered. Watch the flags, weigh the pattern, and trust the process that treats your time and your questions as if they count. That is the company worth saying yes to.",
    },
  ],
};
