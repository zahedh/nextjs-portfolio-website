import { JobExperience } from '@/types/experience';
import { isOngoing } from '@/lib/date';

export type JobGroup = {
  company: string;
  location: string;
  jobs: JobExperience[];
  /** The span the whole group covers, e.g. `2020 — 2023` or `2023 — Present`. */
  span: string;
};

/**
 * Groups consecutive roles at the same employer so a promotion reads as one
 * run rather than as unrelated jobs. Order is preserved: a return to a former
 * employer stays a separate group rather than folding into the earlier one.
 */
export function groupJobsByCompany(jobs: JobExperience[]): JobGroup[] {
  const groups: JobGroup[] = [];

  for (const job of jobs) {
    const current = groups[groups.length - 1];
    if (current && current.company === job.company) {
      current.jobs.push(job);
      continue;
    }
    groups.push({
      company: job.company,
      location: job.location,
      jobs: [job],
      span: '',
    });
  }

  for (const group of groups) {
    const first = group.jobs[group.jobs.length - 1];
    const last = group.jobs[0];
    const from = first.startDate.trim().split(/\s+/).pop() ?? '';
    const to = isOngoing(last.endDate)
      ? 'Present'
      : (last.endDate.trim().split(/\s+/).pop() ?? '');
    group.span = from === to ? from : `${from} — ${to}`;
  }

  return groups;
}
