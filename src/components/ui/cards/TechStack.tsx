import { SkillTile } from '@/components/ui/tiles';
import type { Skill } from '@/data/skills';
import { en } from '@/language';
import { cn } from '@/lib/utils';

/**
 * Tech icons use the same SkillTile hover language as the Skills section
 * (scale + brand fill) — no secondary ring/hover system.
 */
export function TechStack({
  skills,
  maxIcons,
  className,
  /** When set, "+N more" is a button (e.g. job cards without a description expand control). */
  onMoreClick,
}: {
  skills: Skill[];
  maxIcons?: number;
  className?: string;
  onMoreClick?: () => void;
}) {
  const capped = maxIcons != null ? skills.slice(0, maxIcons) : skills;
  const extra =
    maxIcons != null && skills.length > maxIcons
      ? skills.length - maxIcons
      : 0;

  return (
    <div
      className={cn(
        'flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3',
        className
      )}
    >
      {capped.map((skill) => (
        <SkillTile
          key={skill.id}
          icon={skill.icon}
          label={skill.label}
          compact
        />
      ))}
      {extra > 0 &&
        (onMoreClick ? (
          <button
            type="button"
            onClick={onMoreClick}
            className="text-brand-600 dark:text-brand-400 inline-flex h-10 cursor-pointer items-center rounded-full border border-brand-500/40 bg-brand-300/25 px-3 text-xs font-semibold transition-colors hover:bg-brand-300/40 dark:bg-brand-800/30 dark:hover:bg-brand-800/45"
            aria-label={en.projectDisplay.moreSkills.replace(
              '{{count}}',
              String(extra)
            )}
          >
            {en.projectDisplay.moreSkills.replace('{{count}}', String(extra))}
          </button>
        ) : (
          <span
            className="text-brand-600 dark:text-brand-400 inline-flex h-10 items-center rounded-full border border-brand-500/40 bg-brand-300/25 px-3 text-xs font-semibold dark:bg-brand-800/30"
            aria-label={en.projectDisplay.moreSkills.replace(
              '{{count}}',
              String(extra)
            )}
          >
            {en.projectDisplay.moreSkills.replace('{{count}}', String(extra))}
          </span>
        ))}
    </div>
  );
}
