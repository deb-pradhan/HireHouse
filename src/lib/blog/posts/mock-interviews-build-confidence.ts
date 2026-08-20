import type { Post } from "../types";

export const post: Post = {
  id: "mock-interviews-build-confidence",
  slug: "mock-interviews-build-confidence",
  title: "Mock interviews build real confidence, not the fake kind.",
  excerpt:
    "Confidence in an interview is mostly rehearsal. A mock round closes the gap between a story you can think and one you can say, while the stakes are zero.",
  category: "interview-prep",
  author: { name: "The HireHouse team", role: "Editorial" },
  publishedAt: "2026-08-18T09:00:00.000Z",
  cover: {
    src: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1200&h=675&q=75&auto=format&fit=crop",
    alt: "Two people in a job interview across a desk",
  },
  body: [
    {
      type: "lead",
      text: "The confidence that reads well in an interview is not a personality trait. It is familiarity. The people who seem calm in the room are usually the ones who have already said their answers out loud, more than once, before it counted. That is what a mock interview is for.",
    },
    {
      type: "h2",
      id: "a-mock-round-is-rehearsal-not-a-formality",
      text: "A mock round is rehearsal, not a formality.",
    },
    {
      type: "p",
      text: "There is a real gap between a story you can think and a story you can say. In your head the answer is complete, ordered, obviously good. Out loud it wanders, doubles back, and runs out of road before the point lands. You do not find that gap by rereading your notes. You find it by talking, to a person, against a clock.",
    },
    {
      type: "p",
      text: "A mock round is where you meet the fumbles while the stakes are zero. The question you thought you had an answer for turns out to be three answers tangled together. The example you were proud of has no ending. Better to learn that in a practice call than in the one that decides the job. A missed answer in a mock costs you nothing. The same miss in the real room costs you the round.",
    },
    {
      type: "p",
      text: "It also makes the real interview feel familiar instead of foreign. The format stops being a surprise. You have sat in the chair, heard your own voice answer a hard question, and lived through the pause before you knew what to say. When the real thing arrives, your body treats it as **something you have done before**, because you have.",
    },
    {
      type: "h2",
      id: "how-to-actually-use-one",
      text: "How to actually use one.",
    },
    {
      type: "p",
      text: "A mock interview only works if you treat it like the real thing. Half-effort practice teaches you to be half-ready. Dress the way you would, sit where you would, and answer as if the offer is on the line. The discomfort is the point. You want to feel it now, in the version that cannot hurt you.",
    },
    {
      type: "ul",
      items: [
        "Do a few, not one. The first round burns off nerves. The value shows up in the second and third.",
        "Say every answer out loud, start to finish. Do not stop at \"I know what I'd say here.\"",
        "Ask for specific feedback, not a grade. Where did I ramble, where did I lose you, which answer was weakest.",
        "Act on the notes before the next round. Feedback you do not use is just a transcript.",
      ],
    },
    {
      type: "p",
      text: "MockHouse runs mock rounds built from the actual job description, and gives you a score with written feedback so you can see which answers landed and which ones need another pass. Fast Track includes two mock rounds for the same reason. None of it replaces the work of doing a few and acting on what they tell you. The tool sets the questions. The reps are still yours.",
    },
    {
      type: "callout",
      text: "The goal of a mock round is not to sound perfect. It is to have already made your mistakes somewhere they do not count.",
    },
    {
      type: "quote",
      text: "Confidence is not something you talk yourself into the night before. It is the residue of having already said the words out loud.",
    },
  ],
};
