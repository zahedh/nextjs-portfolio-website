import { Skill } from '@/types/skill';
import { en } from '@/language';
import { cn } from '@/lib/utils';

/** Skill labels, optionally capped with a "+N more" pill. */
export function TechStack({
  skills,
  maxItems,
  className,
}: {
  skills: Skill[];
  maxItems?: number;
  className?: string;
}) {
  const capped = maxItems != null ? skills.slice(0, maxItems) : skills;
  const extra =
    maxItems != null && skills.length > maxItems ? skills.length - maxItems : 0;

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
      {capped.map((skill) => (
        <span key={skill.id} className="experience-stack-pill">
          {skill.label}
        </span>
      ))}
      {extra > 0 && (
        <span className="experience-stack-pill experience-stack-more">
          {en.projectDisplay.moreSkills.replace('{{count}}', String(extra))}
        </span>
      )}
    </div>
  );
}
