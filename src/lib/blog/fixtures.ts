import type { Post } from "./types";
import { EXTRA_POSTS } from "./posts";

/** Illustrative blog content (job-market editorial, HireHouse voice). Replaced
 *  by the live Payload API when PAYLOAD_API_URL is set (see lib/blog/source.ts).
 *  Editorial opinion + general guidance only; no fabricated sourced statistics. */

export const POSTS: Post[] = [
  {
    id: "1",
    slug: "past-the-keyword-filter",
    title: "How to get your CV past the keyword filter",
    excerpt:
      "Most applications are sorted by software before a person ever reads them. Here is what that software looks for, and how to give it what it needs without gaming it.",
    category: "job-search",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-08-04T09:00:00.000Z",
    featured: true,
    body: [
      {
        type: "lead",
        text: "You send an application into a form, and nothing comes back. It is easy to take that personally. Usually it is not personal at all. It is a filter doing exactly what it was set up to do, quickly and without context.",
      },
      { type: "h2", id: "what-the-filter-does", text: "What the filter actually does" },
      {
        type: "p",
        text: "Applicant tracking software reads your CV as text and matches it against the words in the job description. If the role asks for a skill and your CV never names it, the match score drops, sometimes far enough that a recruiter never opens the file. The filter is not judging your ability. It is counting overlap.",
      },
      {
        type: "p",
        text: "That means two people with the same experience can get very different outcomes based on the **words** they used to describe it. One wrote **project management**, the other wrote **ran the project**. To a human those are the same. To a keyword match they are not.",
      },
      { type: "h2", id: "give-it-what-it-needs", text: "Give it what it needs, honestly" },
      {
        type: "p",
        text: "You do not need to trick the system. You need to describe your real experience in the words the role uses. Read the job description twice and notice the nouns: the tools, the skills, the responsibilities. Then make sure your CV names the ones you have actually done.",
      },
      {
        type: "ul",
        items: [
          "Mirror the role's exact terms for skills you genuinely have (both the acronym and the full phrase).",
          "Put the important ones in context, not in a keyword pile at the bottom.",
          "Cut the parts of a template that have nothing to do with this role.",
          "Use a clean, single-column layout. Tables and text boxes often parse badly.",
        ],
      },
      {
        type: "callout",
        text: "Never claim a skill you do not have to match a keyword. It gets caught at the interview, and it wastes the one thing you cannot get back: your time.",
      },
      { type: "h2", id: "the-deeper-fix", text: "The deeper fix" },
      {
        type: "p",
        text: "Formatting your CV for a filter is a workaround, not a solution. The real problem is that the first read is done by something that cannot see context. That is the part we are trying to change: read every application on merit, then let a person make the call. Until that is everywhere, describe your work plainly and in the role's own language, and you will clear more filters than you lose.",
      },
      {
        type: "quote",
        text: "The goal is not to beat the filter. It is to be read the way a fair human would read you.",
      },
    ],
  },
  {
    id: "2",
    slug: "structured-interview-prep",
    title: "What a structured interview really tests, and how to prepare",
    excerpt:
      "A structured interview asks everyone the same questions against the same bar. That is good news if you prepare for the shape of it, not just the trivia.",
    category: "interview-prep",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-07-21T09:00:00.000Z",
    body: [
      {
        type: "lead",
        text: "Unstructured interviews drift. One candidate gets grilled, the next gets a chat about the weather, and the decision leans on who felt like a good fit. A structured interview fixes the questions and the scoring so everyone is measured the same way.",
      },
      { type: "h2", id: "what-it-tests", text: "What it is really testing" },
      {
        type: "p",
        text: "Most structured questions are behavioural: tell me about a time you did X. The interviewer is not looking for a perfect story. They are looking for evidence, a clear situation, what you actually did, and what came of it.",
      },
      {
        type: "ol",
        items: [
          "Situation: the context, in one or two sentences.",
          "Task: what you were responsible for.",
          "Action: what you specifically did, not what the team did.",
          "Result: what changed because of it, with a number if you have an honest one.",
        ],
      },
      { type: "h2", id: "how-to-prepare", text: "How to prepare for the shape" },
      {
        type: "p",
        text: "Write out five or six real stories from your experience before the interview. Cover a range: a success, a failure you learned from, a conflict, a time you led, a time you followed. You are not memorising a script. You are making sure the raw material is at hand so you are not inventing it under pressure.",
      },
      {
        type: "callout",
        text: "Practise out loud. The gap between a story you can think and a story you can say is bigger than it feels.",
      },
      {
        type: "p",
        text: "If the interview is recorded, treat it like any other, look at the camera, take a breath before you answer, and it is fine to pause to think. A short silence reads as considered. A rushed answer rarely does.",
      },
    ],
  },
  {
    id: "3",
    slug: "cost-of-manual-screening",
    title: "The hidden cost of screening CVs by hand",
    excerpt:
      "The biggest line in your cost-per-hire rarely shows up on an invoice. It is the hours your team spends reading applications one at a time.",
    category: "for-employers",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-06-30T09:00:00.000Z",
    body: [
      {
        type: "lead",
        text: "Ask a hiring manager what a role costs to fill and you will hear about the job board spend, maybe an agency fee. What you rarely hear about is the quietest and often largest cost: the screening itself.",
      },
      { type: "h2", id: "where-the-time-goes", text: "Where the time goes" },
      {
        type: "p",
        text: "A popular role can draw hundreds of applications. Someone has to open each one, read it, and decide. Do the arithmetic on your own team's hourly cost and the number climbs fast, and that is before the first phone screen.",
      },
      {
        type: "ul",
        items: [
          "Reading and sorting the inbound pile.",
          "First-round phone or video screens, scheduled and run by hand.",
          "The back-and-forth to book each conversation.",
          "The role sitting open while all of this happens.",
        ],
      },
      { type: "h2", id: "the-two-failures", text: "The two ways it fails" },
      {
        type: "p",
        text: "Manual screening is expensive, and it is also lossy. When the pile is tall and the week is short, good people get missed, not rejected on merit, just never reached. The cost is paid twice: once in hours, once in the candidates you never met.",
      },
      {
        type: "quote",
        text: "You cannot fix a funnel you cannot see. The first step is admitting the screening line exists.",
      },
      {
        type: "p",
        text: "The point is not to remove people from hiring. It is to let software do the reading at volume so your team spends its hours on the decision, where judgement actually matters.",
      },
    ],
  },
  {
    id: "4",
    slug: "merit-over-keywords",
    title: "Merit over keywords: a fairer way to be hired",
    excerpt:
      "Keyword matching is fast and cheap, and it quietly filters on the wrong thing. Ranking on merit is harder to build and fairer to live with.",
    category: "hiring-trends",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-06-09T09:00:00.000Z",
    body: [
      {
        type: "lead",
        text: "There is a reason keyword filtering became the default. It is cheap, it is fast, and it makes a huge pile of applications feel manageable. The problem is what it measures.",
      },
      { type: "h2", id: "what-keywords-miss", text: "What keywords miss" },
      {
        type: "p",
        text: "A keyword match rewards vocabulary. It favours people who know the right words for the role, which correlates with a lot of things, some of them fair and some of them not. It does not measure whether you can do the work.",
      },
      { type: "h2", id: "what-merit-means", text: "What ranking on merit means" },
      {
        type: "p",
        text: "Ranking on merit means scoring skills and fit directly, then verifying with a structured interview, rather than inferring ability from the words on a page. It is more work to build. It is also much harder to fool, and much fairer to the person who did the work but described it plainly.",
      },
      {
        type: "callout",
        text: "Fair by design means the bar is the same for everyone. Speed can be optional. The standard cannot.",
      },
      {
        type: "p",
        text: "None of this removes the human. The system reads and ranks at volume so that a person can make the final call with a shortlist that was chosen on ability, not on phrasing.",
      },
    ],
  },
  {
    id: "5",
    slug: "keep-your-cv-on-file",
    title: "“We’ll keep your CV on file” and other hiring myths",
    excerpt:
      "Some hiring phrases are kind and mean nothing. Knowing which is which saves you a lot of waiting by the phone.",
    category: "job-search",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-05-19T09:00:00.000Z",
    body: [
      {
        type: "lead",
        text: "Job hunting is full of soft phrases that sound like doors left open. Most of them are just polite ways to close the conversation. It helps to know the difference so you can move on faster.",
      },
      { type: "h2", id: "on-file", text: "“We’ll keep your CV on file”" },
      {
        type: "p",
        text: "Usually this means nothing will happen next. Files are rarely revisited, and when a new role opens the search starts fresh. It is not a lie, exactly. It is just not a plan. Treat it as a no and keep applying elsewhere.",
      },
      { type: "h2", id: "overqualified", text: "“You’re overqualified”" },
      {
        type: "p",
        text: "Sometimes true, often a stand-in for a worry the interviewer did not want to say out loud, that you will be bored, or leave, or cost too much. If you want the role, the useful move is to answer the worry directly rather than argue the label.",
      },
      { type: "h2", id: "what-to-trust", text: "What to actually trust" },
      {
        type: "ul",
        items: [
          "A specific next step with a date.",
          "Written feedback you can act on.",
          "An answer, even a no, within a stated window.",
        ],
      },
      {
        type: "quote",
        text: "The kindest thing a hiring process can give you is a clear answer. The second kindest is a fast one.",
      },
    ],
  },
  {
    id: "6",
    slug: "cv-tailoring-without-lying",
    title: "Tailoring your CV without lying about your skills.",
    excerpt:
      "Tailoring your CV is normal and should not mean making anything up. The honest version of your experience, described in the words a particular job uses, usually beats the version that tries to slip something past the reader.",
    category: "job-search",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-07-28T09:00:00.000Z",
    cover: {
      src: "/blog/cv-tailoring-without-lying.jpg",
      alt: "Close-up of typed resume text printed on white paper.",
    },
    body: [
      {
        type: "lead",
        text: "You can tailor your CV for a specific role without making anything up. The test is simple: if a hiring manager asks about a line in an interview, can you defend it with a real example? If yes, it is tailoring. If no, it is something else.",
      },
      {
        type: "h2",
        id: "what-the-line-between-tailoring-and-lying-actually-is",
        text: "What the line between tailoring and lying actually is.",
      },
      {
        type: "p",
        text: "Most candidates do not have a qualifications problem. They have a presentation problem. Their real experience is fine, but it is described in words the job does not use, so a reader, human or otherwise, does not recognise it. Tailoring fixes that by rephrasing real work in the role's own language. Lying fixes it by adding work that did not happen. The two look similar on a CV. They are not the same in an interview room.",
      },
      {
        type: "p",
        text: "The clearest test is one you can run on yourself before you send anything. Read each line of your CV out loud and imagine being asked to back it up for a minute with specifics. If you can, the line is honest tailoring. If you have to hedge, soften, or invent on the spot, the line is doing something else, and it is the line that will catch you later.",
      },
      {
        type: "h2",
        id: "what-honest-tailoring-looks-like-in-practice",
        text: "What honest tailoring looks like in practice.",
      },
      {
        type: "p",
        text: "Real tailoring does three things, and only three. It reorders your experience so the most relevant work is on top. It rewrites bullet points using the words the job description uses, where the underlying work matches. It cuts anything that does not serve this application, including long descriptions of roles that have nothing to do with this one. Nothing is added.",
      },
      {
        type: "ul",
        items: [
          "**Rephrase** what you actually did, in the target role's exact terms.",
          "**Quantify** from numbers you genuinely know, not from figures you would have to invent.",
          "**Reorder** your experience so the most relevant role opens the page.",
          "**Cut** anything you cannot defend in a thirty second answer.",
        ],
      },
      {
        type: "h2",
        id: "where-people-usually-cross-the-line",
        text: "Where people usually cross the line.",
      },
      {
        type: "p",
        text: "The trouble spots are predictable. Padding a skill level you only touched once into a primary tool. Promoting a side contributor into a lead because the bullet reads better. Inverting a partial metric into a clean number. Shaving dates to hide a short gap. Each feels small on its own. Together they turn an honest CV into one you cannot defend, which is the thing the interview is built to find.",
      },
      {
        type: "callout",
        text: "The CV that gets you the interview should be the one you can defend on the call. If you have to switch documents between rooms, the tailoring has gone too far.",
      },
      {
        type: "h2",
        id: "why-the-honest-version-usually-wins",
        text: "Why the honest version usually wins.",
      },
      {
        type: "p",
        text: "The honest version of your CV is not a weaker document. It is the one a recruiter can verify without a follow-up call, and the one you can walk through without checking your notes. That matters because the interview is the next round, not a separate event. A line that survives scrutiny at the desk is the line that pays off in the room. Tailoring that adds nothing, only clarifies what is already there, tends to outlast the version that tried to slip something past the reader.",
      },
      {
        type: "p",
        text: "Tailoring is a translation, not an upgrade. You are putting real experience into the words a particular job uses, and cutting the parts that do not help. If you cannot stand behind a line out loud, do not put it on the page. That is the whole rule, and it is enough.",
      },
    ],
  },
  {
    id: "7",
    slug: "remote-interview-setup-that-works",
    title: "Your video interview setup is mostly audio and light, not gear.",
    excerpt:
      "Most remote interview advice is about cameras and microphones you do not own. The two things that decide how you come across on a video call are audio quality and lighting, and both are fixable in fifteen minutes.",
    category: "interview-prep",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-07-14T09:00:00.000Z",
    cover: {
      src: "/blog/remote-interview-setup-that-works.jpg",
      alt: "A microphone on a stand set up for a video recording, lit by a warm light.",
    },
    body: [
      {
        type: "lead",
        text: "Most remote interview advice is about cameras and microphones you do not own. Skip that. The two things that decide whether you come across as clear and present on a video call are **audio quality and lighting**, and both are fixable in fifteen minutes with what you already have.",
      },
      {
        type: "h2",
        id: "light-and-framing-are-ninety-percent",
        text: "Light and framing are ninety percent of how you look on camera.",
      },
      {
        type: "p",
        text: "Sit facing a window if you can, or place a desk lamp on the screen side of your face pointed at you. Light behind you turns your face into a silhouette and forces the camera to brighten the rest of the room, which makes you look tired. Diffuse harsh sun with a thin curtain, or turn sideways to the window and let the light wrap your cheekbones.",
      },
      {
        type: "p",
        text: "Stack your laptop on a few books so the camera sits at eye level. A low camera tilts your chin up and reads as nervous. A high camera tilts down and reads as condescending. Eye level is neutral, and neutral reads as confident.",
      },
      {
        type: "p",
        text: "Frame so your head fills the upper third of the shot with shoulders and a little chest visible. Pull the laptop closer rather than zooming, since digital zoom softens your face. Leave a few centimeters of headroom. Empty space above you makes the frame feel cramped.",
      },
      {
        type: "h2",
        id: "audio-beats-video-every-single-time",
        text: "Audio beats video every single time.",
      },
      {
        type: "p",
        text: "Interviewers will forgive a soft webcam. **They will not forgive echo**, keyboard clatter, or a neighbor's blender. Pick the smallest furnished room you have, close the door, and switch off anything that hums. Soft surfaces like curtains, rugs, and a wardrobe behind you soak up echo. Bare walls send it straight back into your mic.",
      },
      {
        type: "p",
        text: "Use wired earbuds or a headset with a mic arm. Bluetooth sounds fine until it drops for a second mid-sentence, which it will. If you own a USB mic, plug it in and select it in the meeting app, then record ten seconds of yourself and play it back. If you hear room echo, the mic did its job and the room is telling you the truth.",
      },
      {
        type: "p",
        text: "Mute yourself when the other person is talking. It is a small courtesy, and it stops your mic from picking up typing, sipping, and the dog.",
      },
      {
        type: "h2",
        id: "make-the-room-do-the-work",
        text: "Make the room do the work, not your webcam.",
      },
      {
        type: "p",
        text: "A plain wall and a tidy room beat every virtual background on the market. Fake backgrounds glitch around hair, glasses, and hands, and they look uncanny on lower-end webcams. Real and a little boring is the right answer. Move the laundry basket. Close the closet door. Put a lamp or a plant in the corner so the background is not a flat void behind your head.",
      },
      {
        type: "p",
        text: "Tell the people you live with when the interview is and ask for ten minutes of quiet. Put your phone on silent and face down, not just on vibrate. Close every browser tab you do not need for the call, since a busy browser can starve the video stream and leave you frozen on screen.",
      },
      {
        type: "h2",
        id: "run-one-full-test-the-day-before",
        text: "Run one full test the day before.",
      },
      {
        type: "p",
        text: "Do a full test call in the same seat, at the same time of day if you can. Check that the camera, mic, and speakers are the right devices in the meeting app. Check the framing on your phone, not the laptop preview, since the laptop lies a little about how other people see you. Run a speed test at the same time as the call.",
      },
      {
        type: "ul",
        items: [
          "A wired headset or USB mic, selected as the input device.",
          "A window or desk lamp lighting your face, with the camera at eye level.",
          "A plain background with the door closed and notifications silenced.",
          "A backup plan: mobile hotspot, second device, or a quiet cafe on standby.",
        ],
      },
      {
        type: "p",
        text: "A candidate who handles a tech failure calmly signals composure under pressure, which is the whole point of the interview. The setup is not the interview. Once the camera is on and the audio is clean, the work moves back to your answers and your energy. Treat the room as one more piece of prep, not a separate problem, and the call itself gets a lot easier.",
      },
    ],
  },
  {
    id: "8",
    slug: "behavioural-stars-not-required",
    title: "You don't need STAR to answer behavioural interview questions.",
    excerpt:
      "The STAR formula taught candidates to pick one specific moment and end with what changed. The trouble starts when the structure becomes a script you read aloud, instead of a real story you tell in your own words.",
    category: "interview-prep",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-06-22T09:00:00.000Z",
    cover: {
      src: "/blog/behavioural-stars-not-required.jpg",
      alt: "Close-up of a notebook page with handwritten notes and a pen resting on top.",
    },
    body: [
      {
        type: "lead",
        text: "Every interview prep guide treats STAR like a magic key. Situation. Task. Action. Result. Memorise it, rehearse it, deliver it. The problem is that hiring is for the real story, not a polished script. You can answer behaviourally without the formula, and the answer will sound more like you.",
      },
      {
        type: "h2",
        id: "star-gave-us-a-useful-structure-then-a-trap",
        text: "STAR gave us a useful structure, then a trap.",
      },
      {
        type: "p",
        text: "STAR was a useful pushback against vagueness. \"Tell me about a time\" used to invite rambling. The acronym taught candidates to pick one moment, describe what they did, and end with what changed. That part still holds. The damage is in the next step: turning that structure into a script you read aloud.",
      },
      {
        type: "p",
        text: "When the answer is rehearsed word for word, the texture disappears. Eye contact drifts. Sentence rhythm goes flat. The interviewer is not checking whether you remembered four headings. They are checking how you think under pressure and whether the story is true.",
      },
      {
        type: "h2",
        id: "interviewers-listen-for-three-things-not-four-headings",
        text: "Interviewers listen for three things, not four headings.",
      },
      {
        type: "p",
        text: "A strong behavioural answer does three things. It points to a real moment, not a vague one. It shows what you decided, not just what you did. It tells the listener what changed, in numbers, in behaviour, or in the team's posture.",
      },
      {
        type: "p",
        text: "You do not need a four-part acronym to get there. You need a specific memory, a clean sentence about your role, and a clear ending. If you can say 'the migration broke on launch night, I rewrote the retry path, the next deploy shipped clean', you have already done the work.",
      },
      {
        type: "h2",
        id: "answer-behaviourally-without-the-formula",
        text: "Answer behaviourally, without the formula.",
      },
      {
        type: "p",
        text: "Pick one story and stick with it. Vague stories sound evasive. Specific ones sound honest.",
      },
      {
        type: "ul",
        items: [
          "Pick a moment you can describe in two sentences, not one you can only describe in generalities.",
          "Start with what was at stake. The team, the customer, the deadline, the cost.",
          "Describe your decision, not the company's. Hiring is about what you did.",
          "Close with what changed. A number, a behaviour, a lesson that travelled.",
          "If you forgot a detail, say so. Inventing detail is worse than admitting a gap.",
        ],
      },
      {
        type: "p",
        text: "The point is to sound like yourself on a good day, not like a candidate who studied a manual. Interviewers have heard plenty of rehearsed answers. A clear, slightly imperfect one stands out by being clear.",
      },
      {
        type: "callout",
        text: "Rehearsed is not the same as prepared. You can think through the shape of your stories, decide which two or three to bring, and still answer in your own words when the question lands.",
      },
      {
        type: "p",
        text: "The acronym is not the enemy. Treating it as a script is. A good behavioural answer is a real story, in your own voice, with a beginning, a middle, and an end. Skip the formula and write it like you'd explain it to a friend who asked what you actually do at work. That is the version hiring managers remember.",
      },
    ],
  },
  {
    id: "9",
    slug: "skills-based-hiring-2026",
    title: "Skills-based hiring in 2026: the announcement moved faster than the practice.",
    excerpt:
      "Most employers say they have dropped degree requirements. Fewer have changed how they actually hire. Here is what stuck, what did not, and what both sides should take from the gap.",
    category: "hiring-trends",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-08-12T09:00:00.000Z",
    cover: {
      src: "/blog/skills-based-hiring-2026.jpg",
      alt: "A young woman working at a laptop in a bright, modern office.",
    },
    body: [
      {
        type: "lead",
        text: "Skills-based hiring is the rare workplace idea that almost everyone agrees with in public and almost no one has finished implementing in private. A few years into the shift, the gap between what employers say and what their hiring data shows has become the story of 2026.",
      },
      {
        type: "h2",
        id: "the-announcement-moved-faster-than-the-practice",
        text: "The announcement moved faster than the practice.",
      },
      {
        type: "p",
        text: "Dropping a degree requirement from a job description is a one-line edit. Actually hiring differently requires new sourcing channels, new interview rubrics, and managers willing to trust unfamiliar credentials. Most employers have done the first thing. A smaller share have done the second.",
      },
      {
        type: "p",
        text: "The result is a familiar pattern. Job postings now regularly read \"equivalent experience considered,\" while the candidates who actually get offers still tend to look a lot like the candidates who got offers before the language changed. For candidates without degrees, the door is technically open. In practice, it is often guarded by the same screening habits it always was.",
      },
      {
        type: "h2",
        id: "where-it-has-actually-stuck",
        text: "Where it has actually stuck.",
      },
      {
        type: "p",
        text: "A minority of employers have rebuilt the hiring funnel around skills rather than around the credential. They tend to share a few habits worth naming.",
      },
      {
        type: "ul",
        items: [
          "They replaced the degree filter with structured assessments, work samples, or simulations, not just softer language.",
          "They trained hiring managers to score skills against a rubric instead of reading a CV for pedigree.",
          "They published outcome data, like non-degree hire share or retention by entry path, and held themselves to it.",
        ],
      },
      {
        type: "p",
        text: "Where this has happened, the result is real. Non-degree hire rates move, retention holds, and the talent pool widens in a measurable way. State and federal employers, plus a small set of large private ones, account for most of the genuine adopters. Everyone else is, at best, in progress.",
      },
      {
        type: "h2",
        id: "what-candidates-should-take-from-this",
        text: "What candidates should take from this.",
      },
      {
        type: "p",
        text: "The most useful thing a candidate can do in 2026 is sort employers by behavior rather than by posting. A removed degree line tells you the policy moved. It does not tell you the floor moved with it. Look for companies that describe the assessments they use, the credentials they accept in place of a degree, and the results they have published.",
      },
      {
        type: "p",
        text: "For candidates without degrees, the path that consistently works is a **proof stack**: a portfolio, a deployed project, a vendor-specific certification, or a recorded walk-through of real work. These travel better than a credential claim because they answer the question the skills-based employer is actually asking, which is what you can do, not where you went to school.",
      },
      {
        type: "callout",
        text: "Treat \"degree required\" as a hard filter and \"equivalent experience considered\" as a question. The answer to that question is in the employer's track record, not the job ad.",
      },
      {
        type: "h2",
        id: "what-employers-should-take-from-this",
        text: "What employers should take from this.",
      },
      {
        type: "p",
        text: "Skills-based hiring is an operating model change, not a messaging update. Editing the job description is the cheapest part. The hard parts are rebuilding the rubric, training the managers, and accepting that the new funnel will surface people who do not look like the old ones.",
      },
      {
        type: "p",
        text: "Employers who treat the policy as the whole plan should expect the gap to keep showing up in their data. Employers who treat the policy as the start of a rebuild are the ones whose 2026 hiring numbers will look different from their 2022 ones. That, more than any press release, is what skills-based hiring actually means.",
      },
    ],
  },
  {
    id: "10",
    slug: "gulf-and-india-graduate-market",
    title: "Two graduate markets, plainly: the Gulf and India.",
    excerpt:
      "The Gulf and India both hire fresh graduates, and the markets look very different up close. One is smaller and denser, the other is huge and competitive. Here is a plain read of what each market tends to reward at the start of a career.",
    category: "hiring-trends",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-06-02T09:00:00.000Z",
    cover: {
      src: "/blog/gulf-and-india-graduate-market.jpg",
      alt: "Aerial night view of Downtown Dubai's glowing skyscrapers.",
    },
    body: [
      {
        type: "lead",
        text: "It is tempting to treat graduate hiring as one global conversation. In practice it is two very different ones, and pretending otherwise wastes time. A first job in the Gulf and a first job in India share a shape. Both reward proof of work over proof of paper. They diverge on almost everything else.",
      },
      {
        type: "h2",
        id: "the-shape-of-the-funnel",
        text: "The shape of the funnel",
      },
      {
        type: "p",
        text: "The Gulf, broadly the UAE and a few neighbours, runs on a small, crowded market. Each entry-level role draws application piles from across the region, and the recruiter's first pass is often a screen of hundreds of files in a single day. India runs on volume in the other direction. The candidate pool is much larger, and the role count has not kept pace with the number of graduates coming through.",
      },
      {
        type: "p",
        text: "The pressure lands differently. In the Gulf a strong CV, written for the funnel, can stand out because the recruiter is reading a smaller pile. In India a strong CV has to survive the same filter that a great many others did, on the way to a shortlist of only a handful of names. Same word on the page, different world behind it.",
      },
      {
        type: "h2",
        id: "the-role-mix-is-not-the-same",
        text: "The role mix is not the same",
      },
      {
        type: "p",
        text: "The Gulf pulls graduates toward finance, retail, hospitality, healthcare support, construction, and a smaller but growing technology sector. The pace is fast, the employer mix is concentrated, and many of the roles that hire freshers at scale are operational, customer-facing, or compliance-driven.",
      },
      {
        type: "p",
        text: "India pulls graduates much harder through technology and services. IT, business process work, and the rise of global capability centres in smaller cities now sit alongside the traditional IT services firms. Manufacturing and engineering are quietly hiring more, while the bulk of graduate roles sits in services, technology, and modern industry.",
      },
      {
        type: "p",
        text: "That shapes the first job. In the Gulf it is more likely at a known local employer or one of the global firms with a regional office, where English is the working language and the hours are routine. In India the first job is more often a salaried role at a services firm, a startup, or a global capability centre, with longer hours, internal ladders, and a long conversation about which city to be in.",
      },
      {
        type: "h2",
        id: "language-and-how-the-screening-feels",
        text: "Language and how the screening feels",
      },
      {
        type: "p",
        text: "Both markets run on English more in writing than in speaking, but they sound different in the room. Gulf interviews are usually conducted in English, even when the working language of the team is Arabic, Hindi, or Urdu, and presentation and punctuality are read closely. Indian interviews slip easily between English and a regional language at the early stages, and a clear technical story tends to matter more than polish.",
      },
      {
        type: "p",
        text: "The first read of a CV is, in both places, a software pass. The Gulf filters tend to be more permissive on titles and certificates, because a recruiter is reading a smaller pile quickly, and a referral short-circuits more of the screen. The Indian filters are tighter, because the pile is enormous and the recruiter has to lean on the software. Both reward a CV that names the right tools in the right order, plainly.",
      },
      {
        type: "h2",
        id: "what-tends-to-work-for-a-first-job",
        text: "What tends to work for a first job",
      },
      {
        type: "ul",
        items: [
          "A short portfolio of two or three real projects, each with a clear problem, the tools you used, and what changed for the user.",
          "Internships, freelance work, or campus roles that resulted in something shipped, not just attended.",
          "An honest CV that names the tools and the role they were used in, written in the language of the job description.",
          "One or two strong referrals from people who have worked with you, since both markets still read referrals faster than cold applications.",
          "AI fluency as a baseline, not a differentiator. Both markets now expect these tools at every stage.",
        ],
      },
      {
        type: "callout",
        text: "The first job is the one that proves you can do the next one. Make it one someone will remember you for in a good way.",
      },
      {
        type: "p",
        text: "The bigger point is the similarity hiding under the surface. Both markets are working out the same problem, how to spot real ability in a pile too large to read by hand, and converging on the same answer. Show the work, name the tools, be plain. The rest can be learned. That part cannot.",
      },
    ],
  },
  {
    id: "11",
    slug: "job-description-attraction-leak",
    title: "Your job description is leaking candidates before they apply.",
    excerpt:
      "Most job descriptions lose strong candidates before they apply. The leak looks like vague titles, laundry list requirements, mismatched tone, and missing salary, and it is fixable with editing, not a rewrite.",
    category: "for-employers",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-05-26T09:00:00.000Z",
    cover: {
      src: "/blog/job-description-attraction-leak.jpg",
      alt: "Laptop screen showing a job posting interface with a Post a job button.",
    },
    body: [
      {
        type: "lead",
        text: "Your job description is not a wish list. It is the first test of whether a candidate trusts you, and most postings fail it before anyone reads a resume. The result is a thinner shortlist, slower hires, and a quiet loss of people you would have liked to meet.",
      },
      {
        type: "h2",
        id: "the-job-description-is-doing-three-jobs-badly",
        text: "The job description is doing three jobs, badly.",
      },
      {
        type: "p",
        text: "Most job postings try to be a job ad, a contract, and a wish list at the same time. Candidates read them in seconds, on a phone, while comparing your role to four others. If the title is vague, the requirements are bloated, and the salary is missing, they move on without telling you. You never see the candidate who almost clicked apply.",
      },
      {
        type: "h2",
        id: "where-the-leak-actually-happens",
        text: "Where the leak actually happens.",
      },
      {
        type: "ol",
        items: [
          "Vague or inflated titles that no one inside the company uses. 'Marketing Ninja' or 'Senior Cloud Wizard' sounds playful until a serious candidate wonders what the team actually calls you. Plain titles match how people search, and readable titles read as honest.",
          "Laundry list requirements. Fifteen bullets, half of them copied from the last posting, two of them real. Candidates who could do the job well often decide they look underqualified on paper. The bar is set by the list, not the work.",
          "Tone that mismatches the audience. A casual startup feel can charm designers and alienate finance hires. A corporate template can make a creative team feel like a stiff place to work. Either mismatch by itself shrinks the pool.",
          "Salary opacity. Posting a salary range is not a concession. It is a filter for serious candidates and a guard against late-stage drop-off. Leaving it out tells the strongest applicants to assume the worst, and they do not apply.",
          "No clear answer to 'what would I actually do here.' If the first 90 days, the team, or the manager are not described, candidates fill the gap with the worst version. Vague reads as chaotic.",
        ],
      },
      {
        type: "h2",
        id: "the-fix-is-editing-not-rewriting",
        text: "The fix is editing, not rewriting.",
      },
      {
        type: "p",
        text: "You rarely need to replace a job description. You need to cut it. Keep the five to seven outcomes that actually define the role for the first six months. Move anything nice-to-have into a separate section called 'growing into the role.' Use the title your team uses internally, not the one a peer company shipped two years ago.",
      },
      {
        type: "p",
        text: "Write the salary range. If you cannot publish a number, publish a band and the reason it is broad. Better candidates apply when they know the range, and they accept offers faster because they did not enter the process with a wrong guess.",
      },
      {
        type: "h2",
        id: "what-to-do-this-week",
        text: "What to do this week.",
      },
      {
        type: "ul",
        items: [
          "Read your top three postings on a phone, as a candidate would. Note every place where you would hesitate to apply.",
          "Cut the requirements list to the ones that would block a hire in month one. Move the rest.",
          "Add a salary band, even a wide one, in the local currency.",
          "Write one paragraph about the manager and the team. People apply to people, not to roles.",
          "Send the draft to two people who recently passed on the role, or who declined an offer. Ask what put them off.",
        ],
      },
      {
        type: "p",
        text: "A job description is the first interview you run with every candidate, and most of them fail it without you knowing. Treat the posting like a product page for a role you actually need to fill, not like a form to satisfy the ATS. The fix is mostly subtraction, and the candidates who apply after the edit will be closer to the people you wanted to hire from the start.",
      },
    ],
  },
  {
    id: "12",
    slug: "structured-vs-unstructured-roi",
    title: "Structured interviews are not slower. They are just earlier.",
    excerpt:
      "The cost of a structured loop shows up before the first candidate. The saving shows up months later, in fewer replays, fewer panel disagreements, and fewer regretted hires. Here is how to read that trade honestly.",
    category: "for-employers",
    author: { name: "The HireHouse team", role: "Editorial" },
    publishedAt: "2026-05-05T09:00:00.000Z",
    cover: {
      src: "/blog/structured-vs-unstructured-roi.jpg",
      alt: "Four people seated on stage during a panel discussion.",
    },
    body: [
      {
        type: "lead",
        text: "Most hiring teams treat interview structure as a tax. They feel the upfront hours in question writing, rubric scoring, and interviewer calibration, and they decide it is not worth it. The error is timing. Structure is paid in design time and earned in the parts of hiring that hurt the most: replays, panel disagreements, and the slow bleed of a wrong hire.",
      },
      {
        type: "h2",
        id: "what-you-are-paying-for-upfront",
        text: "What you are actually paying for upfront.",
      },
      {
        type: "p",
        text: "A real structured loop takes work before a single candidate walks in. Someone writes the role brief. Someone turns that brief into a small number of competency areas. Someone else writes a question for each area, a behavioral anchor for each score, and a calibration session where the panel agrees on what a strong answer looks like. None of this is free, and none of it should be hidden.",
      },
      {
        type: "p",
        text: "Treat that work as a design cost, not an interview cost. You are designing a measurement instrument that you will reuse across many hires for the same role. The first hire pays the full price. The fifth hire pays almost nothing. That amortization is the entire game.",
      },
      {
        type: "h2",
        id: "what-you-stop-paying-for-later",
        text: "What you stop paying for later.",
      },
      {
        type: "p",
        text: "Unstructured interviews look cheap in the room and expensive in the quarter after. The failure modes are familiar to anyone who has run a hiring loop: two interviewers with opposite opinions, a fourth-round debate that re-litigates the first, a hire that looks great on paper and stalls on the job. Each of these has a cost that is easy to feel and hard to budget.",
      },
      {
        type: "ul",
        items: [
          "Replay loops, where a contested decision forces another round that no one has time for.",
          "Panel disagreements after the fact, where a structured rubric would have settled the question in the room.",
          "Reference churn, where every new hire resets the team and the team resets the new hire.",
          "Hiring manager fatigue, the slow loss of conviction that the process can be trusted at all.",
        ],
      },
      {
        type: "p",
        text: "Structure does not remove disagreement. It moves it earlier, into the design phase, where it is cheaper to resolve. Two interviewers arguing over a score on a shared rubric is a five-minute conversation. Two interviewers arguing over a gut feeling is a meeting that grows.",
      },
      {
        type: "h2",
        id: "what-earlier-actually-looks-like",
        text: "What earlier actually looks like.",
      },
      {
        type: "p",
        text: "Earlier means a calibration call before the first interview, not a debrief after the last. Earlier means the hiring manager and the recruiter agree on what good looks like for this role in this team, with the actual rubric in front of them. Earlier means the panel has practiced the questions on each other and noticed where their scores diverge.",
      },
      {
        type: "p",
        text: "It also means admitting when a role is not worth the design spend. A junior role you will hire ten of this year deserves a real loop. A one-off senior hire you will make once deserves at least a written rubric, even if you skip the full calibration. The point is to spend design effort in proportion to the cost of getting it wrong, not to perform rigor for its own sake.",
      },
      {
        type: "callout",
        text: "If you cannot write down what good looks like for the role, you are not ready to interview for it. The rubric is the test, and writing it is half of designing it.",
      },
      {
        type: "h2",
        id: "how-to-read-the-trade-honestly",
        text: "How to read the trade honestly.",
      },
      {
        type: "p",
        text: "Do not pitch structured interviews as faster. They are not, on day one. Pitch them as cheaper across a quarter, a year, and a role you intend to hire for more than once. The right unit of account is the loop, not the interview.",
      },
      {
        type: "p",
        text: "Run the same loop a few times and watch what moves. Time-to-hire settles. Debriefs get shorter. The hiring manager starts to trust the panel's score instead of overriding it. None of that is a slogan. It is what an instrument does when you build it before you need it.",
      },
    ],
  },
  ...EXTRA_POSTS,
];
