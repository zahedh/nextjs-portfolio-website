import { aboutHighlightStats } from '@/data/about';
import { en } from '@/language';
import { cn } from '@/lib/utils';

type AboutHighlightsPanelProps = {
  className?: string;
};

/** Stat tiles in a 2-column grid (no visible heading; `aria-label` for context). */
export default function AboutHighlightsPanel({
  className,
}: AboutHighlightsPanelProps) {
  return (
    <aside
      aria-label={en.aboutSection.highlightsHeading}
      className={cn(
        'surface-card surface-card-interactive flex min-w-0 flex-col gap-4 p-5 sm:p-6 lg:flex-1',
        className
      )}
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-5">
        {aboutHighlightStats.map((row) => (
          <div
            key={row.label}
            className="flex flex-col items-center gap-1.5 text-center sm:gap-2"
          >
            <p className="font-heading text-2xl font-bold tabular-nums text-brand-600 sm:text-3xl dark:text-brand-400">
              {row.value}
            </p>
            <p className="text-xs leading-snug text-neutral-600 sm:text-sm dark:text-neutral-400">
              {row.label}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
