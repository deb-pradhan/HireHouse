import type { Post } from "../types";
import { post as mockInterviews } from "./mock-interviews-build-confidence";
import { post as whatFastTrackBuys } from "./what-fast-track-buys";
import { post as shortlistInDays } from "./shortlist-in-days-not-weeks";
import { post as referenceChecks } from "./reference-checks-that-actually-help";
import { post as putSalaryInAd } from "./put-the-salary-in-the-ad";
import { post as firstJobNoExperience } from "./first-job-no-experience";
import { post as interviewRedFlags } from "./interview-red-flags-for-candidates";

/** Blog posts authored as individual files (one per post). Combined into the
 *  full set in fixtures.ts. Newest-first ordering is handled by getPosts(). */
export const EXTRA_POSTS: Post[] = [
  mockInterviews,
  whatFastTrackBuys,
  shortlistInDays,
  referenceChecks,
  putSalaryInAd,
  firstJobNoExperience,
  interviewRedFlags,
];
