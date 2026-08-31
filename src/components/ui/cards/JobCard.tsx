'use client';

import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import { useExpandableContent } from '@/hooks/utilityHooks';
import { cn } from '@/lib/utils';
import { en } from '@/language';
import { JobExperience } from '@/types/experience';
import { isJobActive } from '@/data/experience';

interface JobCardProps {
  job: JobExperience;
}

/** Compact experience row with expandable role details. */
export default function JobCard({ job }: JobCardProps) {
  const { isExpanded, contentHeight, contentRef, handleToggle } =
    useExpandableContent(0);

  const jobSkills = getSkillsByIds(job.skills, skillsData);
  const active = isJobActive(job);
  const detailsId = useId();

  return (
    <article
      className={cn(
        'experience-card',
        active ? 'experience-card-active' : 'experience-card-past'
      )}
    >
      <div className="experience-card-heading">
        <h3 className="experience-card-title">{job.title}</h3>
        {active && (
          <span className="experience-current">
            {en.jobDisplay.statusCurrent}
          </span>
        )}
      </div>

      <p className="experience-meta">
        {job.company} <span aria-hidden="true">·</span> {job.location}
      </p>
      <p className="experience-summary">{job.summary}</p>

      <button
        type="button"
        className="experience-expand-button"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls={detailsId}
      >
        {isExpanded ? en.jobDisplay.hideDetails : en.jobDisplay.showDetails}
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={cn(
            'transition-transform duration-300 motion-reduce:transition-none',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      <div
        id={detailsId}
        style={{ maxHeight: isExpanded ? `${contentHeight}px` : '0px' }}
        className="experience-details"
        aria-hidden={!isExpanded}
        inert={!isExpanded}
      >
        <div ref={contentRef} className="experience-details-content">
          <div className="space-y-3">
            {job.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-body leading-relaxed text-neutral-600 dark:text-neutral-400"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <TechStack skills={jobSkills} className="xl:hidden" />
        </div>
      </div>
    </article>
  );
}
