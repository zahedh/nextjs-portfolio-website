import { SkillTile } from '@/components/ui/tiles';
import { Skill } from '@/types/skill';
import { en } from '@/language';
import { cn } from '@/lib/utils';

/** Tech icon grid with optional "+N more" overflow indicator. */
export function TechStack({
  skills,
  maxItems,
  className,
  onMoreClick,
  variant = 'tiles',
}: {
  skills: Skill[];
  maxItems?: number;
  className?: string;
  onMoreClick?: () => void;
  variant?: 'tiles' | 'labels';
}) {
  const capped = maxItems != null ? skills.slice(0, maxItems) : skills;
  const extra =
    maxItems != null && skills.length > maxItems ? skills.length - maxItems : 0;
  const moreLabel =
    extra > 0
      ? en.projectDisplay.moreSkills.replace('{{count}}', String(extra))
      : '';

  // items-start, or each wrapped line stretches its children to the tallest
  // thing in it: the taller "+N more" pill inflates every label sharing its
  // line, and they visibly shrink when expanding removes it.
  return (
    <div
      className={cn(
        'flex flex-wrap items-start justify-start gap-2',
        className
      )}
    >
      {capped.map((skill) =>
        variant === 'labels' ? (
          <span key={skill.id} className="experience-stack-pill">
            {skill.label}
          </span>
        ) : (
          <SkillTile
            key={skill.id}
            icon={skill.icon}
            label={skill.label}
            compact
          />
        )
      )}
      {extra > 0 &&
        (onMoreClick ? (
          <button
            type="button"
            onClick={onMoreClick}
            className="more-pill hover:bg-brand-500/50 dark:hover:bg-brand-600/30 cursor-pointer transition-colors"
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
