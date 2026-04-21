import { Project } from '@/types/project';

/** Human-readable timeline from project dates. */
export function formatProjectTimeline(project: Project): string {
  return `${project.startDate} – ${project.endDate}`;
}

/** Whether the project is still ongoing (end date is “Present”). */
export function isProjectActive(project: Project): boolean {
  return project.endDate.trim().toLowerCase() === 'present';
}

/** Strip leading bullet markers (✦, •, -, *) from a description line for excerpts and list items. */
export function stripDescriptionLine(raw: string): string {
  return raw.replace(/^\s*[✦•\-*]\s*/, '').trim();
}

/** First description paragraph, stripped of bullet markers — used for card excerpts and overview blocks. */
export function getProjectExcerptLine(project: Project): string {
  const first = project.description[0];
  if (!first) return '';
  return stripDescriptionLine(first);
}

/**
 * Lines to show under “Features” in the detail panel: same as `description` but skips the first
 * paragraph when it duplicates the overview (first line).
 */
export function getProjectDetailFeatureLines(project: Project): string[] {
  const overview = getProjectExcerptLine(project);
  if (overview && project.description.length > 1) {
    return project.description.slice(1);
  }
  if (overview && project.description.length === 1) {
    return [];
  }
  return project.description;
}
