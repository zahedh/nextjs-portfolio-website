'use client';
import { SkillTile } from '@/components/ui/tiles';
import Image from 'next/image';

import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import type { Project } from '@/data/projects';
import { Building2, ChevronDown, Monitor, Smartphone } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const projectSkills = getSkillsByIds(project.skills, skillsData);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [project]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card-container mx-auto mt-6 w-full max-w-3xl">
      {/* Date badge */}
      <div className="card-date-badge -top-3">
        {project.startDate} - {project.endDate}
      </div>

      {/* Project image */}
      <div className="card-image-wrapper">
        <div className="flex h-64 w-full items-center justify-center">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title + ' preview'}
              width={320}
              height={192}
              style={{
                maxHeight: '12rem',
                width: 'auto',
                objectFit: 'contain',
              }}
              className="rounded-xl bg-neutral-100 shadow-md dark:bg-neutral-800"
              priority
            />
          ) : project.projectType === 'Web' ? (
            <Monitor
              className="h-28 w-28 text-neutral-400 sm:h-32 sm:w-32 dark:text-neutral-600"
              strokeWidth={1.5}
            />
          ) : (
            <Smartphone
              className="h-28 w-28 text-neutral-400 sm:h-32 sm:w-32 dark:text-neutral-600"
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>

      {/* Compact header - always visible */}
      <div className="p-6 md:p-8">
        <h3 className="card-title">{project.title}</h3>
        <div className="card-meta-row mb-6">
          <Building2 className="" size={16} />
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {project.company}
          </span>
        </div>

        {/* Expandable details – scroll when constrained so content is never cut off */}
        <div
          className={
            isExpanded
              ? 'overflow-x-hidden overflow-y-auto'
              : 'overflow-hidden'
          }
          style={{
            maxHeight: isExpanded ? `min(${contentHeight}px, 70vh)` : '0px',
            transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: isExpanded ? 'max-height' : 'auto',
          }}
        >
          <div ref={contentRef} className="space-y-6 pb-8">
            {/* Description */}
            <div className="space-y-4">
              {project.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="card-description text-sm leading-normal tracking-tight sm:text-base md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Skills */}
            <div className="card-skills">
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
        <button onClick={handleToggle} className="card-expand-btn">
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
