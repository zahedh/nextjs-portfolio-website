'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, Building2, Code2, ChevronDown } from 'lucide-react';
import { SkillTile } from '@/components/ui/tiles';
import { skillsData } from '@/data/skills';
import type { JobExperience } from '@/data/experience';

interface JobCardProps {
  job: JobExperience;
  isLeft?: boolean;
}

export default function JobCard({ job, isLeft = false }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(true); // Start with true to test
  const [contentHeight, setContentHeight] = useState<number>(0);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Check if content exceeds max height
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const fullHeight = contentRef.current.scrollHeight;
        setContentHeight(fullHeight);
        setShowExpandButton(fullHeight > 300);
      }
    };

    // Check immediately and after a short delay to ensure rendering is complete
    checkOverflow();
    const timer = setTimeout(checkOverflow, 100);

    return () => clearTimeout(timer);
  }, [job.description]);

  // Handle expand/collapse with scroll
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);

    // Scroll card to center after state update
    if (!isExpanded && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
  };

  // Get skill objects from skill IDs
  const jobSkills = job.skills
    .map((skillId) => skillsData.find((s) => s.id === skillId))
    .filter((skill): skill is NonNullable<typeof skill> => skill !== undefined);

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
        <div className="bg-brand-300 dark:bg-brand-500 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-neutral-900 dark:text-neutral-100">
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
          ref={descriptionRef}
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
          onClick={handleToggleExpand}
          className="bg-brand-300 hover:bg-brand-400 dark:bg-brand-500 dark:hover:bg-brand-400 mb-8 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-neutral-900 transition-colors dark:text-neutral-100"
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
