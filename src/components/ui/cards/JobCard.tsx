'use client';

import { MapPin, Building2, Code2, ChevronDown } from 'lucide-react';
import { SkillTile } from '@/components/ui/tiles';
import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import { useExpandableContent } from '@/hooks/utilityHooks';
import type { JobExperience } from '@/data/experience';
import { useRef } from 'react';

interface JobCardProps {
  job: JobExperience;
  isLeft?: boolean;
}

export default function JobCard({ job, isLeft = false }: JobCardProps) {
  const {
    isExpanded,
    showExpandButton,
    contentHeight,
    contentRef,
    handleToggle: originalHandleToggle,
  } = useExpandableContent(300);

  const cardRef = useRef<HTMLDivElement>(null);
  const jobSkills = getSkillsByIds(job.skills, skillsData);

  const handleToggle = () => {
    const wasExpanded = isExpanded;
    originalHandleToggle();

    if (!wasExpanded && cardRef.current) {
      // Wait for the content to expand fully, then scroll
      setTimeout(() => {
        if (cardRef.current) {
          const cardRect = cardRef.current.getBoundingClientRect();
          const cardCenter = cardRect.top + cardRect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const scrollOffset = cardCenter - viewportCenter;

          window.scrollBy({
            top: scrollOffset,
            behavior: 'smooth',
          });
        }
      }, 250);
    }
  };

  return (
    <div
      ref={cardRef}
      className="border-brand-300 relative rounded-2xl border-2 bg-neutral-100 p-6 shadow-sm transition-all duration-300 hover:shadow-lg md:p-8 dark:bg-neutral-900"
    >
      {/* Date badge */}
      <div
        className={`bg-brand-300 dark:bg-brand-400 absolute -top-4 left-6 flex w-[200px] items-center justify-center rounded-full px-5 py-2 text-sm font-bold text-neutral-900 dark:text-neutral-100 ${
          isLeft ? 'lg:right-6 lg:left-auto' : 'lg:left-6'
        }`}
      >
        {job.startDate} - {job.endDate}
      </div>

      {/* Job header */}
      <div className="mt-6 mb-8 flex items-start gap-4">
        {/* Developer icon */}
        <div className="border-brand-500 bg-brand-300 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border text-neutral-900 dark:text-neutral-200">
          <Code2 size={24} />
        </div>

        <div className="flex-1">
          <h3 className="t-lg mb-2 text-neutral-900 dark:text-neutral-100">
            {job.title}
          </h3>
          <div className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Building2 size={16} />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job description */}
      <div className="relative mb-10">
        <div
          style={{
            maxHeight: isExpanded ? `${contentHeight}px` : '300px',
            transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className="overflow-hidden"
        >
          <div ref={contentRef} className="space-y-4">
            {job.description.map((paragraph, index) => (
              <p
                key={index}
                className="t-sm text-neutral-700 dark:text-neutral-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Subtle gradient fade */}
        {!isExpanded && showExpandButton && (
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-gradient-to-t from-neutral-100 to-transparent dark:from-neutral-900" />
        )}
      </div>

      {/* Show more/less button */}
      {showExpandButton && (
        <button
          onClick={handleToggle}
          className="border-brand-500 bg-brand-300 hover:bg-brand-500 mb-8 flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium text-neutral-900 transition-colors dark:text-neutral-200"
        >
          {isExpanded ? 'Show less' : 'Show more'}
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      )}

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {jobSkills.map((skill) => (
          <SkillTile
            key={skill.id}
            icon={skill.icon}
            label={skill.label}
            compact
          />
        ))}
      </div>
    </div>
  );
}
