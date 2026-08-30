'use client';

import { en } from '@/language';
import { getProjectExcerptLine, isProjectActive } from '@/lib/ui-logic';
import { cn } from '@/lib/utils';
import { Project } from '@/types/project';

const PROJECT_COVER_CLASSES = [
  'project-cover-amber',
  'project-cover-violet',
  'project-cover-blue',
  'project-cover-brown',
];

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
  const excerpt = getProjectExcerptLine(project);

  if (variant === 'compact') {
    return (
      <button
        type="button"
        className={cn('project-card-compact', className)}
        onClick={() => onOpenFullDetails(project)}
        aria-label={`${en.projectCard.viewProject}: ${project.title}`}
      >
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

  const coverClassName =
    PROJECT_COVER_CLASSES[
      project.id.charCodeAt(project.id.length - 1) %
        PROJECT_COVER_CLASSES.length
    ];
  const status = isProjectActive(project)
    ? en.projectDisplay.statusActive
    : en.projectDisplay.statusCompleted;

  return (
    <button
      type="button"
      className="project-card-feature"
      onClick={() => onOpenFullDetails(project)}
      aria-label={`${en.projectCard.viewProject}: ${project.title}`}
    >
      <span className={cn('project-card-cover', coverClassName)} aria-hidden />
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
