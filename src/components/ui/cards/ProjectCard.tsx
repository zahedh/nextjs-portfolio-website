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
        'surface-card surface-card-interactive group relative mx-auto mt-6 w-full max-w-2xl overflow-hidden 2xl:max-w-xl',
        /* Flatter tile: border carries depth; minimal shadow + hover */
        'shadow-none hover:-translate-y-px hover:shadow-sm dark:shadow-none dark:hover:shadow-neutral-950/15',
        'md:hover:ring-1 md:hover:ring-brand-500/15'
      )}
    >
      <button
        type="button"
        onClick={() => onOpenFullDetails(project)}
        className="group/hero relative block w-full cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-offset-neutral-900"
        aria-label={`${en.projectCard.viewProject}: ${project.title}`}
      >
        <ProjectHeroMedia
          project={project}
          imagePriority={imagePriority}
          className="rounded-none border-0 shadow-none"
        />
        {/* Light bottom fade only — keeps “View project” readable without darkening the whole image */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-900/25 to-transparent sm:h-20 dark:from-black/35"
          aria-hidden
        />
        {mounted && (
          <span className="pointer-events-none absolute right-3 bottom-3 text-sm font-semibold text-white drop-shadow-sm opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover/hero:opacity-100 md:right-4 md:bottom-4">
            {en.projectCard.viewProject} {en.projectCard.viewProjectArrow}
          </span>
        )}
      </button>

      <div className="space-y-5 p-6 sm:p-8">
        <ProjectMeta project={project} variant="ribbon" />

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
