'use client';
import { SkillTile } from '@/components/ui/tiles';
import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import type { Project } from '@/data/projects';
import { Building2, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const projectSkills = getSkillsByIds(project.skills, skillsData);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [project]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);

    if (!isExpanded && cardRef.current) {
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
      className="border-brand-300 relative mx-auto mt-6 w-full max-w-3xl rounded-2xl border-2 bg-neutral-100 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-neutral-900"
    >
      {/* Date badge */}
      <div className="bg-brand-300 dark:bg-brand-400 absolute -top-3 left-6 flex w-[200px] items-center justify-center rounded-full px-5 py-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
        {project.startDate} - {project.endDate}
      </div>

      {/* Project image */}
      <div className="flex items-center justify-center rounded-t-2xl bg-neutral-200 dark:bg-neutral-800">
        <div className="flex h-64 w-full items-center justify-center text-neutral-400 dark:text-neutral-600">
          {/* Image placeholder - replace with actual image when available */}
          <svg
            className="h-16 w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Compact header - always visible */}
      <div className="p-6 md:p-8">
        <h3 className="t-lg mb-2 text-neutral-900 dark:text-neutral-100">
          {project.title}
        </h3>
        <div className="mb-6 flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <Building2 className="" size={16} />
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {project.company}
          </span>
        </div>

        {/* Expandable details */}
        <div
          className="overflow-hidden"
          style={{
            maxHeight: isExpanded ? `${contentHeight}px` : '0px',
            transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: isExpanded ? 'max-height' : 'auto',
          }}
        >
          <div ref={contentRef} className="space-y-6 pb-6">
            {/* Description */}
            <div className="space-y-4">
              {project.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="t-sm text-neutral-700 dark:text-neutral-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {projectSkills.map((skill) => (
                <SkillTile
                  key={skill.id}
                  icon={skill.icon}
                  label={skill.label}
                  compact
                />
              ))}
            </div>
          </div>
        </div>

        {/* Expand/Collapse button */}
        <button
          onClick={handleToggle}
          className="border-brand-500 bg-brand-300 hover:bg-brand-500 flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium text-neutral-900 transition-colors dark:text-neutral-200"
        >
          {isExpanded ? 'Show less' : 'View details'}
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    </div>
  );
}
