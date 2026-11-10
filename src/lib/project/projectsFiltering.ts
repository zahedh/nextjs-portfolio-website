import { Project, ProjectFilter } from '@/types/project';
import { projectHasCategory } from '@/lib/ui-logic';
import { toMonthIndex } from '@/lib/date';

/**
 * Projects for the section: category filter, then newest first by end date.
 * Ongoing work resolves to the current month, so it leads without a separate key.
 */
export function getFilteredProjectsForSection(
  allProjects: Project[],
  selectedType: ProjectFilter
): Project[] {
  const list =
    selectedType === 'All'
      ? [...allProjects]
      : allProjects.filter((project) =>
          projectHasCategory(project, selectedType)
        );
  const now = new Date();
  const endedAt = (project: Project) => toMonthIndex(project.endDate, now) ?? 0;
  const startedAt = (project: Project) =>
    toMonthIndex(project.startDate, now) ?? 0;
  return [...list].sort(
    (projectA, projectB) =>
      endedAt(projectB) - endedAt(projectA) ||
      startedAt(projectB) - startedAt(projectA)
  );
}
