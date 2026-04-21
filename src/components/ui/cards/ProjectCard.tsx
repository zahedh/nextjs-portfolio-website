'use client';

import { ProjectHeroMedia } from '@/components/ui/cards/ProjectHeroMedia';
import { ProjectMetaSummary } from '@/components/ui/cards/ProjectMetaItems';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import { Project } from '@/types/project';
import { en } from '@/language';
import { getProjectExcerptLine } from '@/lib/ui-logic';
import { cn, getSkillsByIds } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { TertiaryButton } from '../buttons';

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
  const excerpt = getProjectExcerptLine(project);

  useEffect(() => setMounted(true), []);

  return (
    <div
      className={cn(
        'project-card surface-card surface-card-interactive surface-card-flat group relative mx-auto mt-6 w-full max-w-xl overflow-hidden'
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
          frameClassName="h-40 sm:h-44 md:h-48"
        />
        <div className="hero-fade-overlay" aria-hidden />
        {mounted && (
          <span className="hero-hover-label">
            {en.projectCard.viewProject} {en.projectCard.viewProjectArrow}
          </span>
        )}
      </button>

      <div className="space-y-6 p-7 sm:p-9">
        <ProjectMetaSummary project={project} variant="ribbon" />

        <h3 className="card-title line-clamp-2">{project.title}</h3>

        {excerpt ? (
          <p className="body-text-muted line-clamp-2">{excerpt}</p>
        ) : null}

        <TechStack
          skills={projectSkills}
          maxIcons={5}
          onMoreClick={() => onOpenFullDetails(project)}
        />

        <TertiaryButton
          type="button"
          onClick={() => onOpenFullDetails(project)}
          className="card-expand-btn"
        >
          {en.projectCard.fullCaseStudy}
        </TertiaryButton>
      </div>
    </div>
  );
}
