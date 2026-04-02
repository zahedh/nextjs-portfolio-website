import { aboutHighlightStats } from '@/data/about';
import { en } from '@/language';

/** Single companion panel for About proof points (replaces floating stat cards). */
export default function AboutHighlightsPanel() {
  return (
    <aside className="surface-card flex flex-col overflow-hidden">
      <h3 className="border-b border-neutral-200/80 px-4 py-2.5 text-xs font-semibold tracking-[0.12em] text-neutral-600 uppercase dark:border-neutral-700/70 dark:text-neutral-400">
        {en.aboutSection.highlightsHeading}
      </h3>
      <ul className="divide-y divide-neutral-200/75 dark:divide-neutral-700/60">
        {aboutHighlightStats.map((row) => (
          <li key={row.label} className="px-4 py-2 sm:py-2.5">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <p className="font-heading shrink-0 text-lg font-bold tabular-nums text-brand-600 dark:text-brand-400">
                {row.value}
              </p>
              <p className="text-sm leading-snug text-neutral-600 sm:min-w-0 sm:flex-1 sm:text-right sm:text-xs sm:leading-snug dark:text-neutral-400">
                {row.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
