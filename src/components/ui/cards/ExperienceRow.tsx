'use client';

import { useState } from 'react';
import JobCard from '@/components/ui/cards/JobCard';
import { JobStack } from '@/components/ui/cards/JobStack';
import { formatRoleDuration, startYear } from '@/lib/date';
import { isJobActive } from '@/data/experience';
import { cn } from '@/lib/utils';
import { JobExperience } from '@/types/experience';

/**
 * One role on the rail. Owns the expanded state because the card and the stack
 * beside it are siblings that reveal together from a single control.
 */
export default function ExperienceRow({ job }: { job: JobExperience }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const active = isJobActive(job);

  return (
    <div className="experience-rail-row">
      <div
        className={cn('experience-year', active && 'experience-year-active')}
      >
        <span
          aria-hidden="true"
          className={cn('experience-dot', active && 'experience-dot-active')}
        />
        {startYear(job.startDate)}
        <span className="experience-duration">
          {formatRoleDuration(job.startDate, job.endDate)}
        </span>
      </div>
      <JobCard job={job} onToggle={() => setIsExpanded((open) => !open)} />
      <JobStack skillIds={job.skills} expanded={isExpanded} />
    </div>
  );
}
