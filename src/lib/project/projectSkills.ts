import { projects } from '@/data/projects';
import { normalizeSkillId, scrollElementIntoViewAdaptive } from '@/lib/utils';

/** Whether a project lists the given skill ID (with {@link normalizeSkillId} matching). */
export function projectMatchesSkill(
  project: { skills: string[] },
  skillId: string
): boolean {
  const normalizedSkillId = normalizeSkillId(skillId);
  return project.skills.some(
    (projectSkill) => normalizeSkillId(projectSkill) === normalizedSkillId
  );
}

/** True if at least one project uses this skill (skills collage → projects filter). */
export function hasAnyProjectForSkill(skillId: string): boolean {
  return projects.some((project) => projectMatchesSkill(project, skillId));
}

/** Scrolls to the projects section anchor. */
export function scrollToProjectsSection(): void {
  const element = document.querySelector('#projects');
  if (!element) return;
  scrollElementIntoViewAdaptive(element);
}
