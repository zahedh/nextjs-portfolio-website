import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';

export interface Skill {
  id: string;
  label: string;
  icon: IconType | LucideIcon;
  category: SkillCategory;
}

export type SkillCategory =
  | 'frameworks'
  | 'languages'
  | 'microsoft'
  | 'legacy'
  | 'web-fundamentals'
  | 'design'
  | 'database'
  | 'dev-tools'
  | 'testing'
  | 'api'
  | 'collaboration'
  | 'productivity'
  | 'ai'
  | 'os'
  | 'methodologies';
