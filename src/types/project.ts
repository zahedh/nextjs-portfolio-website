export type ProjectCategory = 'Web' | 'Mobile' | 'AI';

export type ProjectFilter = 'All' | ProjectCategory;

/**
 * How much of a project a reader can actually reach today, not how it is
 * licensed: 'Open source' has a repository to read, 'Public' ships something
 * anyone can use without the source, 'Private' is neither. Several projects are
 * expected to move outwards over time, so this is current state rather than a
 * permanent property.
 */
export type ProjectAccess = 'Open source' | 'Public' | 'Private';

export interface Project {
  id: string;
  /**
   * Every category the project genuinely spans, primary first. The primary drives
   * the cover ramp and the platform icon; a second blends into the cover behind it.
   */
  categories: ProjectCategory[];
  /** Required so a new project cannot be added without stating its access. */
  access: ProjectAccess;
  title: string;
  /** One-line card summary, ~85 characters. Cards fall back to the first description line. */
  summary?: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
  image?: string;
  imageToken?: string;
  url?: string;
  urlLabel?: string;
  repoUrl?: string;
  repoLabel?: string;
}

export interface ProjectLinkItem {
  url: string;
  label?: string;
}
