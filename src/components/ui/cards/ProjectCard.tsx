'use client';

import { en } from '@/language';
import { getProjectCardSummary, isProjectActive } from '@/lib/ui-logic';
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
  const label = [`${en.projectCard.viewProject}: ${project.title}`]
    .concat(project.categories.length ? project.categories.join(', ') : [])
    .join('. ');

  if (variant === 'compact') {
    return (
      <button
        type="button"
        className={cn('project-card-compact', className)}
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
          <p
            className={cn(
              'project-card-compact-excerpt',
              project.access !== 'Private' &&
                'project-card-compact-excerpt-inset'
            )}
          >
            {excerpt}
          </p>
        ) : null}
        {/* Only the reachable projects say so. Most are private, so a label on
            every card would repeat the rule instead of marking the exception.
            Positioned out of flow, like the glyph, so it adds no height. */}
        {project.access === 'Private' ? null : (
          <span className="project-card-compact-access">
            {en.projectAccess[project.access]}
          </span>
        )}
      </button>
    );
  }

  const status = isProjectActive(project)
    ? en.projectDisplay.statusActive
    : en.projectDisplay.statusCompleted;

  return (
    <button
      type="button"
      className={cn('project-card-feature', className)}
      onClick={() => onOpenFullDetails(project)}
      aria-label={label}
    >
      <span className="project-card-cover" aria-hidden>
        <ProjectCategoryMarks
          project={project}
          className="category-marks-on-cover"
          markClassName="category-mark-on-cover"
        />
      </span>
      <span className="project-card-feature-body">
        {/* Year, status and access are one class of fact, so they share one
            rail rather than splitting across two treatments on one card. */}
        <span className="project-card-feature-meta">
          {project.startDate.slice(-4)} <span aria-hidden>·</span> {status}{' '}
          <span aria-hidden>·</span> {en.projectAccess[project.access]}
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
