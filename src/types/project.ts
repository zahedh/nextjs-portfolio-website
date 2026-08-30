export type ProjectFilter = 'All' | 'Web' | 'Mobile' | 'AI';

export interface Project {
  id: string;
  projectType: 'Mobile' | 'Web';
  /** Marks work whose substance is AI, whatever platform it ships on. */
  isAiProject?: boolean;
  title: string;
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
