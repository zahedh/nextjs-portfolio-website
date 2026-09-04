'use client';

import { en } from '@/language';
import {
  getProjectCardSummary,
  getProjectCoverClasses,
  isProjectActive,
} from '@/lib/ui-logic';
import { ProjectCategoryMarks } from '@/components/ui/cards/ProjectCategoryMarks';
import { cn } from '@/lib/utils';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  variant: 'feature' | 'compact';
  onOpenFullDetails: (project: Project) => void;
  className?: string;
}

/** Opens a project detail panel from either a feature or compact card. */
export default function ProjectCard({
  project,
  variant,
  onOpenFullDetails,
  className,
}: ProjectCardProps) {
  const excerpt = getProjectCardSummary(project);
  const coverClassNames = getProjectCoverClasses(project);
  const label = [`${en.projectCard.viewProject}: ${project.title}`]
    .concat(project.categories.length ? project.categories.join(', ') : [])
    .join('. ');

  if (variant === 'compact') {
    return (
      <button
        type="button"
        className={cn('project-card-compact', coverClassNames, className)}
        onClick={() => onOpenFullDetails(project)}
        aria-label={label}
      >
        <ProjectCategoryMarks
          project={project}
          className="project-card-compact-marks"
        />
        <span
          className="project-card-compact-title"
          role="heading"
          aria-level={3}
        >
          {project.title}
        </span>
        {excerpt ? (
          <p className="project-card-compact-excerpt">{excerpt}</p>
        ) : null}
      </button>
    );
  }

  const status = isProjectActive(project)
    ? en.projectDisplay.statusActive
    : en.projectDisplay.statusCompleted;

  return (
    <button
      type="button"
      className="project-card-feature"
      onClick={() => onOpenFullDetails(project)}
      aria-label={label}
    >
      <span className={cn('project-card-cover', coverClassNames)} aria-hidden>
        <ProjectCategoryMarks
          project={project}
          className="category-marks-on-cover"
          markClassName="category-mark-on-cover"
        />
      </span>
      <span className="project-card-feature-body">
        <span className="project-card-feature-meta">
          {project.startDate.slice(-4)} <span aria-hidden>·</span> {status}
        </span>
        <span
          className="project-card-feature-title"
          role="heading"
          aria-level={3}
        >
          {project.title}
        </span>
        {excerpt ? (
          <span className="project-card-feature-excerpt">{excerpt}</span>
        ) : null}
      </span>
    </button>
  );
}
