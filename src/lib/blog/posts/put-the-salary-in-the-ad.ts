import type { Post } from "../types";

export const post: Post = {
  id: "put-the-salary-in-the-ad",
  slug: "put-the-salary-in-the-ad",
  title: "Put the salary in the ad.",
  excerpt:
    "A hidden salary wastes everyone's time. A real range drawn in local currency brings the right people in faster, and it is simply fairer.",
  category: "hiring-trends",
  author: { name: "The HireHouse team", role: "Editorial" },
  publishedAt: "2026-08-14T09:00:00.000Z",
  cover: {
    src: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=1200&h=675&q=75&auto=format&fit=crop",
    alt: "Cash and a calculator on a desk",
  },
  body: [
    {
      type: "lead",
      text: "You can post the salary or you can hide it. Hiding it feels safe, like you have kept some room to negotiate. What it actually does is push the awkward conversation to the end, where it costs the most. The number was always going to come up. The only question is whether it comes up on day one or on offer day.",
    },
    {
      type: "h2",
      id: "a-hidden-salary-wastes-everyones-time",
      text: "A hidden salary wastes everyone's time.",
    },
    {
      type: "p",
      text: "Strong candidates have options, and options make them selective about where they spend their week. When a posting hides pay, a lot of them skip it rather than gamble three rounds of interviews on a number that might be nowhere near what they need. The people who do apply are often the ones with the least choice, which is the opposite of who you were trying to reach.",
    },
    {
      type: "p",
      text: "Then there is the collapse at the end. You run the whole process, agree that this is the person, and the offer lands short of what they quietly assumed. Now you are renegotiating from a weak position, or starting again. The range would have caught that mismatch in the first thirty seconds, for free.",
    },
    {
      type: "callout",
      text: "Every candidate who reads a role with no pay assumes the worst and prices in the risk. The strongest ones price in the risk by not applying.",
    },
    {
      type: "h2",
      id: "a-real-range-does-the-sorting-for-you",
      text: "A real range does the sorting for you.",
    },
    {
      type: "p",
      text: "Posting pay is not a giveaway. It is a filter that runs before anyone reaches your inbox. People who need more than the top of your band self-select out, and people who fit stay in, already comfortable with the number. Roles that post a range tend to draw more relevant applicants, not fewer, because the ones who apply have already agreed to the deal in principle.",
    },
    {
      type: "p",
      text: "The catch is that it has to be a real range. A band of 20,000 to 30,000 a month says something. A band of 8,000 to 40,000 says you have not decided, and candidates read it exactly that way. If the honest spread is genuinely wide, say why: the number moves with seniority, or with which of two roles the person grows into. A reason candidates can see is worth more than a tidy band they do not believe.",
    },
    {
      type: "quote",
      text: "A range is a promise you are willing to make in public. That is precisely why candidates trust it.",
    },
    {
      type: "h2",
      id: "how-to-post-a-range-that-works",
      text: "How to post a range that works.",
    },
    {
      type: "ul",
      items: [
        "Quote it in the local currency: AED per month in the UAE, INR per month or per year in India, in the units people actually think in.",
        "Set the range to what you would truly pay, not a wide band you have no intention of honoring at either end.",
        "Say what moves the number: years of experience, a specific skill, or the level you hire the person in at.",
        "Name what sits alongside base pay, like a bonus or housing, instead of burying it and hoping it closes the gap later.",
        "Keep the band the same in the ad, the screen, and the offer. A range that shifts between rooms undoes the trust the ad just bought.",
      ],
    },
    {
      type: "p",
      text: "None of this is generosity. It is a faster process, a shorter shortlist of people who actually fit, and far fewer offers that fall apart at the last step. Posting the salary also happens to signal respect, that you see the candidate's time as worth as much as your own. Fair and efficient rarely line up this neatly. When they do, take the win and put the number in the ad.",
    },
  ],
};
