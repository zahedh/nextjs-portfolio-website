'use client';

import { ProjectHeroMedia } from '@/components/ui/cards/ProjectHeroMedia';
import { ProjectMeta } from '@/components/ui/cards/ProjectMeta';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import type { Project } from '@/data/projects';
import { en } from '@/language';
import { getProjectExcerptLine } from '@/lib/projectDisplay';
import { cn, getSkillsByIds } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProjectCardProps {
  project: Project;
  imagePriority?: boolean;
  onOpenFullDetails: (project: Project) => void;
}

const externalRel = 'noopener noreferrer';

export default function ProjectCard({
  project,
  imagePriority = false,
  onOpenFullDetails,
}: ProjectCardProps) {
  const [mounted, setMounted] = useState(false);
  const projectSkills = getSkillsByIds(project.skills, skillsData);
  const projectUrl = project.url?.trim();
  const excerpt = getProjectExcerptLine(project);

  useEffect(() => setMounted(true), []);

  return (
    <div
      className={cn(
        'group relative mx-auto mt-6 w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-brand-300/70 bg-neutral-50/96 shadow-lg backdrop-blur-sm transition duration-200 dark:bg-neutral-900/[0.98] dark:shadow-neutral-950/25',
        'hover:-translate-y-0.5 hover:shadow-xl',
        'md:hover:scale-[1.01] md:hover:ring-2 md:hover:ring-brand-500/35'
      )}
    >
      <div className="card-date-badge -top-3 z-20">
        {project.startDate} - {project.endDate}
      </div>

      <div className="relative">
        <ProjectHeroMedia
          project={project}
          imagePriority={imagePriority}
          className="rounded-none border-0 shadow-none"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent"
          aria-hidden
        />
        {mounted && (
          <div
            className="pointer-events-none absolute right-4 bottom-4 hidden text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block"
            aria-hidden
          >
            {en.projectCard.viewProject} {en.projectCard.viewProjectArrow}
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        <h3 className="card-title line-clamp-2">
          {projectUrl ? (
            <a
              href={projectUrl}
              target="_blank"
              rel={externalRel}
              className="card-title-link"
              aria-label={`${project.title} — ${en.projectCard.titleLinkAria}`}
            >
              <span>{project.title}</span>
              <ExternalLink
                className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5"
                aria-hidden
              />
            </a>
          ) : (
            project.title
          )}
        </h3>

        {excerpt ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {excerpt}
          </p>
        ) : null}

        <TechStack skills={projectSkills} maxIcons={5} />

        <ProjectMeta project={project} variant="compact" />

        <button
          type="button"
          onClick={() => onOpenFullDetails(project)}
          className="card-expand-btn"
        >
          {en.projectCard.fullCaseStudy}
        </button>
      </div>
    </div>
  );
}
