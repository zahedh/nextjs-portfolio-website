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
    <div ref={cardRef} className="card-container p-6 md:p-8">
      {/* Date badge */}
      <div
        className={`card-date-badge -top-4 ${isLeft ? 'lg:right-6 lg:left-auto' : 'lg:left-6'}`}
      >
        {job.startDate} - {job.endDate}
      </div>

      {/* Job header */}
      <div className="mt-6 mb-8 flex items-start gap-4">
        {/* Developer icon */}
        <div className="card-icon-box">
          <Code2 size={24} />
        </div>

        <div className="flex-1">
          <h3 className="card-title">{job.title}</h3>
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
                className="card-description text-sm leading-normal tracking-tight sm:text-base md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Subtle gradient fade */}
        {!isExpanded && showExpandButton && (
          <div className="card-fade-gradient" />
        )}
      </div>

      {/* Show more/less button */}
      {showExpandButton && (
        <button onClick={handleToggle} className="card-expand-btn mb-8">
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
      <div className="card-skills">
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
