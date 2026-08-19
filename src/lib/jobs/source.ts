import { jobs } from "./fixtures";
import type { Job } from "./types";

/** The data seam for the jobs surface.
 *
 *  Everything reads jobs through these functions. Today they return fixtures;
 *  later an API or CMS adapter drops in here (fetch, cache, ISR) without any
 *  change to the components or pages that consume them. They are async now so
 *  that switch is invisible to callers.
 */

export async function getJobs(): Promise<Job[]> {
  return jobs;
}

export async function getJob(id: string): Promise<Job | undefined> {
  return jobs.find((job) => job.id === id);
}
