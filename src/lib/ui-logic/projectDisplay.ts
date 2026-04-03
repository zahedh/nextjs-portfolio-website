import type { Project } from '@/data/projects';

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
