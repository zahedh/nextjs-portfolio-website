import type { Project } from '@/data/projects';
import { en } from '@/language';
import { formatProjectTimeline, isProjectActive } from '@/lib/projectDisplay';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

function MetaRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
        {label}
      </span>
      <div className="text-sm font-medium text-neutral-800 sm:text-right dark:text-neutral-200">
        {value}
      </div>
    </div>
  );
}

/** Web / Mobile brand pill. */
export function ProjectPlatformTag({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const platform =
    project.projectType === 'Web'
      ? en.projectDisplay.platformWeb
      : en.projectDisplay.platformMobile;
  return (
    <span className={cn('brand-pill brand-pill-active', className)}>
      {platform}
    </span>
  );
}

/** Active / Completed status pill. */
export function ProjectStatusBadge({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const active = isProjectActive(project);
  const label = active
    ? en.projectDisplay.statusActive
    : en.projectDisplay.statusCompleted;
  return (
    <span
      className={cn(
        'brand-pill',
        active ? 'brand-pill-active' : 'brand-pill-inactive',
        className
      )}
    >
      {label}
    </span>
  );
}

/** Project metadata rendered as ribbon, compact line, or structured panel. */
export function ProjectMeta({
  project,
  variant = 'compact',
  className,
}: {
  project: Project;
  variant?: 'compact' | 'panel' | 'ribbon';
  className?: string;
}) {
  const timeline = formatProjectTimeline(project);

  if (variant === 'ribbon') {
    return (
      <p
        className={cn(
          'meta-row-subtle flex flex-wrap items-center gap-x-2 gap-y-1.5',
          className
        )}
        role="status"
      >
        <span className="font-medium text-neutral-600 dark:text-neutral-300">
          {timeline}
        </span>
        <span className="text-neutral-300 dark:text-neutral-600" aria-hidden>
          ·
        </span>
        <ProjectPlatformTag project={project} />
        <span className="text-neutral-300 dark:text-neutral-600" aria-hidden>
          ·
        </span>
        <ProjectStatusBadge project={project} />
      </p>
    );
  }

  if (variant === 'compact') {
    return (
      <p
        className={cn(
          'flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-neutral-500 dark:text-neutral-400',
          className
        )}
      >
        <span>{timeline}</span>
        <span className="text-neutral-400 dark:text-neutral-500" aria-hidden>
          ·
        </span>
        <ProjectPlatformTag project={project} />
        <span className="text-neutral-400 dark:text-neutral-500" aria-hidden>
          ·
        </span>
        <ProjectStatusBadge project={project} />
      </p>
    );
  }

  return (
    <div
      className={cn(
        'surface-card divide-y divide-neutral-200/70 overflow-hidden rounded-2xl border p-0 dark:divide-neutral-700/70 dark:bg-neutral-900/80',
        className
      )}
    >
      <MetaRow label={en.projectDisplay.timelineLabel} value={timeline} />
      <MetaRow
        label={en.projectDisplay.platformLabel}
        value={<ProjectPlatformTag project={project} />}
      />
      <MetaRow label={en.projectDisplay.contextLabel} value={project.company} />
      <MetaRow
        label={en.projectDisplay.statusLabel}
        value={<ProjectStatusBadge project={project} />}
      />
    </div>
  );
}
