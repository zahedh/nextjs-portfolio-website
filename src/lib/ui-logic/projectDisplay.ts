import { Project, ProjectCategory, ProjectLinkItem } from '@/types/project';
import { en } from '@/language';

/** Human-readable timeline from project dates. */
export function formatProjectTimeline(project: Project): string {
  return `${project.startDate} – ${project.endDate}`;
}

/** Whether the project is still ongoing (end date is “Present”). */
export function isProjectActive(project: Project): boolean {
  return project.endDate.trim().toLowerCase() === 'present';
}

const CATEGORY_SLUG: Record<ProjectCategory, string> = {
  Web: 'web',
  Mobile: 'mobile',
  AI: 'ai',
};

/**
 * Cover ramp classes for a project card, keyed to what the project is rather than
 * to its id. The primary category sets the leading colour; a second, where the
 * project spans one, sets the colour it blends into.
 */
export function getProjectCoverClasses(project: Project): string[] {
  const [primary, secondary] = project.categories;
  if (!primary) return [];
  const classes = [`cover-a-${CATEGORY_SLUG[primary]}`];
  if (secondary) classes.push(`cover-b-${CATEGORY_SLUG[secondary]}`);
  return classes;
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

/** Card excerpt: the written summary where there is one, else the first description line. */
export function getProjectCardSummary(project: Project): string {
  return project.summary?.trim() || getProjectExcerptLine(project);
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

/** Live-site and repo links for a project, trimmed and defaulted, in display order. */
export function getProjectLinkItems(project: Project): ProjectLinkItem[] {
  const candidates: [string | undefined, string | undefined, string][] = [
    [project.url, project.urlLabel, en.projectDisplay.visitLive],
    [project.repoUrl, project.repoLabel, en.projectDisplay.viewRepo],
  ];
  return candidates
    .filter(([url]) => Boolean(url?.trim()))
    .map(([url, label, fallback]) => ({
      url: url!.trim(),
      label: label?.trim() || fallback,
    }));
}
