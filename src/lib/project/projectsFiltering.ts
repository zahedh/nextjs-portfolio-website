import { Project, ProjectFilter } from '@/types/project';
import { isProjectActive } from '@/lib/ui-logic';
import { projectMatchesSkill } from '@/lib/project/projectSkills';

/**
 * Projects for the section: optional skill filter, type filter, then active-first sort.
 */
export function getFilteredProjectsForSection(
  allProjects: Project[],
  selectedType: ProjectFilter,
  selectedSkillId: string | null
): Project[] {
  let list: Project[];
  if (selectedSkillId) {
    list = allProjects.filter((project) =>
      projectMatchesSkill(project, selectedSkillId)
    );
  } else if (selectedType === 'All') {
    list = [...allProjects];
  } else if (selectedType === 'AI') {
    list = allProjects.filter((project) => project.isAiProject);
  } else {
    list = allProjects.filter(
      (project) => project.projectType === selectedType
    );
  }
  return [...list].sort(
    (projectA, projectB) =>
      Number(isProjectActive(projectB)) - Number(isProjectActive(projectA))
  );
}
