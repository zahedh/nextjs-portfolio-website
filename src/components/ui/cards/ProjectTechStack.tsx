'use client';

import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';

/**
 * Resolves skill ids on the client, so a server page can render the stack without
 * passing skill objects across the boundary — each one carries an icon component.
 */
export function ProjectTechStack({ skillIds }: { skillIds: string[] }) {
  return <TechStack skills={getSkillsByIds(skillIds, skillsData)} />;
}
