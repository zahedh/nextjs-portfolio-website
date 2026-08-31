'use client';

import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import { en } from '@/language';

/**
 * The stack a role used, shown beside its card where the rail has room.
 * Resolves the icons itself: they are component functions, so they cannot be
 * passed across the boundary from a server-rendered section.
 */
export function JobStack({
  skillIds,
  expanded = false,
}: {
  skillIds: string[];
  expanded?: boolean;
}) {
  return (
    <div className="experience-stack">
      <span className="experience-stack-label">{en.jobDisplay.stackLabel}</span>
      <TechStack
        skills={getSkillsByIds(skillIds, skillsData)}
        maxIcons={expanded ? undefined : 12}
      />
    </div>
  );
}

export default JobStack;
