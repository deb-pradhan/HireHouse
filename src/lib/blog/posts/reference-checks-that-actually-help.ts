import type { Post } from "../types";

export const post: Post = {
  id: "reference-checks-that-actually-help",
  slug: "reference-checks-that-actually-help",
  title: "Reference checks that actually tell you something.",
  excerpt:
    "Most reference checks are theatre: friendly names, vague questions, vague answers. Here is how to make the call carry real signal, and how to weigh it fairly.",
  category: "hiring-trends",
  author: { name: "The HireHouse team", role: "Editorial" },
  publishedAt: "2026-08-15T09:00:00.000Z",
  cover: {
    src: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?w=1200&h=675&q=75&auto=format&fit=crop",
    alt: "A professional taking a call at their desk",
  },
  body: [
    {
      type: "lead",
      text: "Most reference checks are a ritual, not a check. The candidate hands over two people who like them. You call, ask how they were to work with, and hear that they were great. Everyone nods. Nothing was learned, and a step that could have told you something quietly told you nothing.",
    },
    {
      type: "h2",
      id: "why-most-checks-are-theatre",
      text: "Why most checks are theatre.",
    },
    {
      type: "p",
      text: "The problem starts with who gets named. A candidate picks referees the way anyone would: the people most likely to be kind. That is not dishonest, it is human. But a friendly voice reading a script back to you is not evidence. It is a formality wearing the costume of one.",
    },
    {
      type: "p",
      text: "The questions make it worse. **Vague questions get vague answers.** Ask \"what were they like to work with\" and you invite a shrug of a compliment. The referee is not hiding anything. You just did not give them a question specific enough to say something real, so they reached for the easy, safe words instead.",
    },
    {
      type: "p",
      text: "So the whole exercise becomes a box to tick. You spend twenty minutes hearing what you already assumed, write \"references clear\" in the file, and move on. It feels like diligence. It is closer to a signature. The cost is not the wasted call, it is the false confidence you carry into the offer.",
    },
    {
      type: "h2",
      id: "how-to-make-the-call-signal",
      text: "How to make the call actually signal.",
    },
    {
      type: "p",
      text: "Two changes fix most of it. Talk to people who managed the work, not only the ones who liked the person. And ask for behaviour, not verdicts. You are trying to confirm the story the candidate already told you, from someone who watched it happen.",
    },
    {
      type: "ul",
      items: [
        "What did they actually own, day to day, and what did the team lean on someone else for?",
        "Tell me about a deadline they missed. What happened, and how did they handle it?",
        "Where did they need the most support, and did that change over time?",
        "Would you hire them again, into what kind of role, and why that one?",
      ],
    },
    {
      type: "p",
      text: "Notice these are answerable with a story, not a rating. \"Would you hire them again\" is only useful with the \"why\". A warm yes with no reason is the same non-answer in a nicer wrapper. The reason is the signal.",
    },
    {
      type: "h2",
      id: "one-input-not-a-veto",
      text: "One input, not a veto.",
    },
    {
      type: "p",
      text: "A reference confirms. It should not be the place a strong candidate quietly dies. If everything else said yes and one former manager is lukewarm, that is a question to sit with, not a trapdoor. People clash, roles change, and a single sour memory is not a verdict on a career.",
    },
    {
      type: "p",
      text: "The fair version is boring, and that is the point. You weigh the call the same way you weigh the interview and the work sample: one reading among several, from someone with their own view of the person. When a reference contradicts everything else, that is a reason to look again, not to close the door on the strength of one phone call.",
    },
    {
      type: "quote",
      text: "A reference check is a way to confirm what you already saw, not a secret ballot that overrides it.",
    },
    {
      type: "p",
      text: "Run it late, run it specific, and weigh it against everything else you gathered on the way. Done like that, the call earns its place. Done as a ritual, it is just a phone bill.",
    },
  ],
};
