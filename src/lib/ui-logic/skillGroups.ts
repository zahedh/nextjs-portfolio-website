import { Skill, SkillCategory, SkillGroup } from '@/types/skill';

export const skillGroupOrder: SkillGroup[] = [
  'languages',
  'frameworks',
  'design',
  'aiTooling',
  'toolingAndPractice',
];

const skillGroupByCategory: Record<SkillCategory, SkillGroup> = {
  languages: 'languages',
  'web-fundamentals': 'languages',
  legacy: 'languages',
  database: 'languages',
  frameworks: 'frameworks',
  microsoft: 'frameworks',
  testing: 'frameworks',
  api: 'frameworks',
  design: 'design',
  ai: 'aiTooling',
  'dev-tools': 'toolingAndPractice',
  collaboration: 'toolingAndPractice',
  productivity: 'toolingAndPractice',
  os: 'toolingAndPractice',
  methodologies: 'toolingAndPractice',
};

/** Groups skills without discarding their more specific categories. */
export function groupSkills(skills: Skill[]): Record<SkillGroup, Skill[]> {
  const groups: Record<SkillGroup, Skill[]> = {
    languages: [],
    frameworks: [],
    design: [],
    aiTooling: [],
    toolingAndPractice: [],
  };

  for (const skill of skills) {
    groups[skillGroupByCategory[skill.category]].push(skill);
  }

  return groups;
}
