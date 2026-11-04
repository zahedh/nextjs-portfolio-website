import { Project, ProjectCategory, ProjectLinkItem } from '@/types/project';
import { en } from '@/language';
import { isOngoing } from '@/lib/date';

/** Human-readable timeline from project dates. */
export function formatProjectTimeline(project: Project): string {
  return `${project.startDate} – ${project.endDate}`;
}

/** Whether the project is still ongoing (end date is “Present”). */
export function isProjectActive(project: Project): boolean {
  return isOngoing(project.endDate);
}

/** The platform a project ships on, for the fallback media icon. AI is not a platform. */
export function getProjectPlatform(project: Project): 'Web' | 'Mobile' {
  return project.categories.includes('Mobile') ? 'Mobile' : 'Web';
}

/** Whether the project belongs to a category, for filtering and labelling. */
export function projectHasCategory(
  project: Project,
  category: ProjectCategory
): boolean {
  return project.categories.includes(category);
}

/** The project owning a URL slug, or undefined when nothing does. */
export function getProjectBySlug(
  slug: string,
  allProjects: Project[]
): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}

/** First description paragraph, used for card excerpts and overview blocks. */
export function getProjectExcerptLine(project: Project): string {
  return project.description[0]?.trim() ?? '';
}

/** Card excerpt: the written summary where there is one, else the first description line. */
export function getProjectCardSummary(project: Project): string {
  return project.summary?.trim() || getProjectExcerptLine(project);
}

/** Live-site and repo links for a project, trimmed and defaulted, in display order. */
export function getProjectLinkItems(project: Project): ProjectLinkItem[] {
  const candidates: [string | undefined, string][] = [
    [project.url, en.projectDisplay.visitLive],
    [project.repoUrl, en.projectDisplay.viewRepo],
  ];
  return candidates
    .filter(([url]) => Boolean(url?.trim()))
    .map(([url, label]) => ({ url: url!.trim(), label }));
}
