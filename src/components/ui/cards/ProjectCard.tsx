'use client';
import { SkillTile } from '@/components/ui/tiles';
import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import type { Project } from '@/data/projects';
import { Building2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectSkills = getSkillsByIds(project.skills, skillsData);

  return (
    <div className="border-brand-300 relative mx-auto mt-6 w-full max-w-3xl rounded-2xl border-2 bg-neutral-100 p-6 shadow-sm transition-all duration-300 hover:shadow-lg md:p-8 dark:bg-neutral-900">
      {/* Date badge */}
      <div className="bg-brand-300 dark:bg-brand-400 absolute -top-3 left-6 flex w-[200px] items-center justify-center rounded-full px-5 py-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
        {project.startDate} - {project.endDate}
      </div>

      {/* Project header */}
      <div className="mt-6 mb-6">
        <h3 className="t-lg mb-2 text-neutral-900 dark:text-neutral-100">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
          <Building2 size={16} />
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {project.company}
          </span>
        </div>
      </div>

      {/* Project image */}
      <div className="mb-6 flex items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800">
        <div className="flex h-48 w-full items-center justify-center text-neutral-400 dark:text-neutral-600">
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

      {/* Project description */}
      <div className="mb-8 space-y-4">
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
  );
}
