import type { Project } from '@/data/projects';
import { en } from '@/language';
import {
  formatProjectTimeline,
  isProjectActive,
} from '@/lib/projectDisplay';
import { cn } from '@/lib/utils';

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <span className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
        {label}
      </span>
      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
        {value}
      </span>
    </div>
  );
}

export function ProjectMeta({
  project,
  variant = 'compact',
  className,
}: {
  project: Project;
  variant?: 'compact' | 'panel';
  className?: string;
}) {
  const platform =
    project.projectType === 'Web'
      ? en.projectDisplay.platformWeb
      : en.projectDisplay.platformMobile;
  const status = isProjectActive(project)
    ? en.projectDisplay.statusActive
    : en.projectDisplay.statusCompleted;
  const timeline = formatProjectTimeline(project);

  if (variant === 'compact') {
    return (
      <p
        className={cn(
          'text-xs text-neutral-500 dark:text-neutral-400',
          className
        )}
      >
        <span>{timeline}</span>
        <span className="text-neutral-400 dark:text-neutral-500"> · </span>
        <span>{platform}</span>
        <span className="text-neutral-400 dark:text-neutral-500"> · </span>
        <span>{status}</span>
      </p>
    );
  }

  return (
    <div
      className={cn(
        'divide-y divide-neutral-200/70 overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-50/80 dark:divide-neutral-700/70 dark:border-neutral-700/70 dark:bg-neutral-800/50',
        className
      )}
    >
      <MetaRow label={en.projectDisplay.timelineLabel} value={timeline} />
      <MetaRow label={en.projectDisplay.platformLabel} value={platform} />
      <MetaRow label={en.projectDisplay.contextLabel} value={project.company} />
      <MetaRow label={en.projectDisplay.statusLabel} value={status} />
    </div>
  );
}
