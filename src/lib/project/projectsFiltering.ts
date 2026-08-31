import { Project, ProjectFilter } from '@/types/project';
import { isProjectActive } from '@/lib/ui-logic';

/**
 * Projects for the section: type filter, then active-first sort.
 */
export function getFilteredProjectsForSection(
  allProjects: Project[],
  selectedType: ProjectFilter
): Project[] {
  let list: Project[];
  if (selectedType === 'All') {
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
