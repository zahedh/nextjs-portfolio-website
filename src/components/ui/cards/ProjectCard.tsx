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

/** Carousel card summarising a single project. */
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
        'surface-card surface-card-interactive surface-card-flat group relative mx-auto mt-6 w-full max-w-2xl overflow-hidden 2xl:max-w-xl'
      )}
    >
      <button
        type="button"
        onClick={() => onOpenFullDetails(project)}
        className="hero-btn-area group/hero"
        aria-label={`${en.projectCard.viewProject}: ${project.title}`}
      >
        <ProjectHeroMedia
          project={project}
          imagePriority={imagePriority}
          className="rounded-none border-0 shadow-none"
        />
        <div className="hero-fade-overlay" aria-hidden />
        {mounted && (
          <span className="hero-hover-label">
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
              rel="noopener noreferrer"
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
          <p className="body-text-muted line-clamp-2">{excerpt}</p>
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
