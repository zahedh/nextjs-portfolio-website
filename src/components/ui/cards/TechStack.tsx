import { SkillTile } from '@/components/ui/tiles';
import type { Skill } from '@/data/skills';
import { en } from '@/language';
import { cn } from '@/lib/utils';

/** Tech icon grid with optional "+N more" overflow indicator. */
export function TechStack({
  skills,
  maxIcons,
  className,
  onMoreClick,
}: {
  skills: Skill[];
  maxIcons?: number;
  className?: string;
  onMoreClick?: () => void;
}) {
  const capped = maxIcons != null ? skills.slice(0, maxIcons) : skills;
  const extra =
    maxIcons != null && skills.length > maxIcons ? skills.length - maxIcons : 0;
  const moreLabel =
    extra > 0
      ? en.projectDisplay.moreSkills.replace('{{count}}', String(extra))
      : '';

  return (
    <div
      className={cn('flex flex-wrap justify-start gap-2 sm:gap-3', className)}
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
            className="more-pill cursor-pointer transition-colors hover:bg-brand-300/40 dark:hover:bg-brand-800/45"
            aria-label={moreLabel}
          >
            {moreLabel}
          </button>
        ) : (
          <span className="more-pill" aria-label={moreLabel}>
            {moreLabel}
          </span>
        ))}
    </div>
  );
}
