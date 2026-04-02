import { SkillTile } from '@/components/ui/tiles';
import type { Skill } from '@/data/skills';
import { en } from '@/language';
import { cn } from '@/lib/utils';

export function TechStack({
  skills,
  maxIcons,
  className,
}: {
  skills: Skill[];
  maxIcons?: number;
  className?: string;
}) {
  const capped = maxIcons != null ? skills.slice(0, maxIcons) : skills;
  const extra =
    maxIcons != null && skills.length > maxIcons
      ? skills.length - maxIcons
      : 0;

  return (
    <div
      className={cn(
        'group/stack flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3',
        className
      )}
    >
      {capped.map((skill) => (
        <SkillTile
          key={skill.id}
          icon={skill.icon}
          label={skill.label}
          compact
          className="transition-shadow duration-200 group-hover/stack:shadow-md group-hover/stack:ring-2 group-hover/stack:ring-brand-500/35"
        />
      ))}
      {extra > 0 && (
        <span
          className="text-brand-600 dark:text-brand-400 inline-flex h-10 items-center rounded-full border border-brand-500/40 bg-brand-300/30 px-3 text-xs font-semibold dark:bg-brand-700/30"
          aria-label={en.projectDisplay.moreSkills.replace(
            '{{count}}',
            String(extra)
          )}
        >
          {en.projectDisplay.moreSkills.replace('{{count}}', String(extra))}
        </span>
      )}
    </div>
  );
}
