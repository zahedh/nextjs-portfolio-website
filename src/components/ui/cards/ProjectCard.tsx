'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { en } from '@/language';
import { getProjectCardSummary, isProjectActive } from '@/lib/ui-logic';
import { ProjectCategoryMarks } from '@/components/ui/cards/ProjectCategoryMarks';
import { cn } from '@/lib/utils';
import {
  canMorph,
  morphInto,
  PROJECT_TITLE_SELECTOR,
} from '@/lib/viewTransition';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  variant: 'feature' | 'compact';
  className?: string;
}

/** Links to a project's own page from either a feature or compact card. */
export default function ProjectCard({
  project,
  variant,
  className,
}: ProjectCardProps) {
  const href = `/projects/${project.slug}`;
  const excerpt = getProjectCardSummary(project);
  const router = useRouter();
  const titleRef = useRef<HTMLSpanElement>(null);

  /**
   * Carries the card's title into the page's heading. Every reason not to —
   * a modified click that wants a new tab, a browser without the API, a reader
   * who asked for less motion — falls through to the link's own navigation, so
   * the card behaves as a link first and animates second.
   */
  const openProject = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !titleRef.current ||
      !canMorph()
    ) {
      return;
    }

    event.preventDefault();
    morphInto(titleRef.current, PROJECT_TITLE_SELECTOR, () =>
      router.push(href)
    );
  };
  const label = [`${en.projectCard.viewProject}: ${project.title}`]
    .concat(project.categories.length ? project.categories.join(', ') : [])
    .join('. ');

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className={cn('project-card-compact', className)}
        aria-label={label}
        onClick={openProject}
      >
        <ProjectCategoryMarks
          project={project}
          className="project-card-compact-marks"
        />
        <span
          ref={titleRef}
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
      </Link>
    );
  }

  const status = isProjectActive(project)
    ? en.projectDisplay.statusActive
    : en.projectDisplay.statusCompleted;

  return (
    <Link
      href={href}
      className={cn('project-card-feature', className)}
      aria-label={label}
      onClick={openProject}
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
          ref={titleRef}
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
    </Link>
  );
}
