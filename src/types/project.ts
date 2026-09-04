export type ProjectCategory = 'Web' | 'Mobile' | 'AI';

export type ProjectFilter = 'All' | ProjectCategory;

export interface Project {
  id: string;
  /**
   * Every category the project genuinely spans, primary first. The primary drives
   * the cover ramp and the platform icon; a second blends into the cover behind it.
   */
  categories: ProjectCategory[];
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
