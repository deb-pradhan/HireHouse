import type { Post } from "../types";

export const post: Post = {
  id: "first-job-no-experience",
  slug: "first-job-no-experience",
  title: "How to apply for your first job when every listing wants experience.",
  excerpt:
    "The catch-22 is real: you need a job to get experience, and experience to get the job. It is not total. Here is how to get read on ability.",
  category: "job-search",
  author: { name: "The HireHouse team", role: "Editorial" },
  publishedAt: "2026-08-11T09:00:00.000Z",
  cover: {
    src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&h=675&q=75&auto=format&fit=crop",
    alt: "A recent graduate at the start of their career",
  },
  body: [
    {
      type: "lead",
      text: "You need a job to get experience, and experience to get the job. Almost every entry-level listing asks for two years of it. The catch-22 is real, but it is not total. Most first jobs are won by people who described work they had actually done, in the words the role used, and then prepared hard enough that the interview carried them past a thin CV.",
    },
    {
      type: "h2",
      id: "you-have-more-experience-than-you-think",
      text: "You have more experience than you think.",
    },
    {
      type: "p",
      text: "\"No experience\" almost always means \"no job title yet.\" It rarely means you have never done the work. A university project with a deadline and a team is project work. A part-time shift where you handled money and complaints is customer and operations work. Coursework, volunteering, a freelance gig, a society you ran: these are real, and they count when you name them plainly.",
    },
    {
      type: "p",
      text: "The move is to translate. Read the listing twice and note the nouns it uses for the skills you have genuinely touched. Then describe your own work in those exact words. If the role says **stakeholder communication** and you spent a summer explaining a budget to a committee, that is what you did. Say it that way.",
    },
    {
      type: "ul",
      items: [
        "Course and capstone projects, with the problem, the tools, and what you shipped.",
        "Part-time and shift work, framed as operations, service, or handling money.",
        "Volunteering and campus roles you organised or led.",
        "Freelance or personal projects, even small ones, that someone actually used.",
      ],
    },
    {
      type: "h2",
      id: "show-a-small-piece-of-real-work",
      text: "Show a small piece of real work.",
    },
    {
      type: "p",
      text: "A short list of adjectives convinces no one. One piece of real work does. A recruiter reading a hundred CVs cannot tell a motivated self-starter from an unmotivated one on the page, but they can open a two-page portfolio, a deployed project, or a case study of one thing you built and see the ability for themselves. Pick your best example and make it easy to reach.",
    },
    {
      type: "callout",
      text: "One thing you actually made beats ten things you say you are. Proof travels further than a paragraph about your potential.",
    },
    {
      type: "h2",
      id: "apply-where-ability-is-what-gets-read",
      text: "Apply where ability is what gets read.",
    },
    {
      type: "p",
      text: "Not every process is stacked against a short work history. Some rank on skills and fit and back it with a structured interview, where everyone answers the same questions against the same bar. That format is kinder to early-career people, because it judges what you can do rather than how many years you have done it. Sort roles toward those, and toward employers who describe the assessment they use.",
    },
    {
      type: "p",
      text: "Then prepare properly. A thin CV can still win the room if the interview goes well, so it usually has to. Write out five or six real stories before you go in, say them out loud, and be specific about what you decided and what changed. The listing asked for experience you do not have yet. The point of everything above is to be judged on the ability you do.",
    },
    {
      type: "quote",
      text: "Your first job is not proof you have done the work before. It is proof you can do the work now. Make the case for that.",
    },
  ],
};
