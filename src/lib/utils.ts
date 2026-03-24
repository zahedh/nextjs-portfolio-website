import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { projects } from '@/data/projects';

/** Combines and intelligently merges Tailwind class names. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a keyboard event handler that executes a callback when the Escape key is pressed
 * @param callback - Function to execute when Escape is pressed
 * @returns KeyboardEvent handler function
 */
export function createEscapeHandler(callback: () => void) {
  return (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback();
    }
  };
}

/**
 * Handles smooth scrolling to an anchor element on the page
 * Prevents default anchor behavior and uses scrollIntoView with smooth animation
 * @param e - React mouse event from clicking an anchor link
 */
export function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (href) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Scrolls to the top of the page with smooth animation
 * @param e - Optional React mouse event to prevent default behavior
 */
export function scrollToTop(e?: React.MouseEvent<HTMLAnchorElement>) {
  e?.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function normalizeSkillId(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.\s-]/g, '')
    .trim();
}

/**
 * Maps skill IDs to their corresponding skill objects.
 * Uses the same normalisation as {@link projectMatchesSkill} (e.g. `vb.net` ↔ `vb-net`, `next.js` ↔ `nextjs`).
 */
export function getSkillsByIds<T extends { id: string }>(
  skillIds: string[],
  skillsData: T[]
): T[] {
  return skillIds
    .map((skillId) => {
      const exact = skillsData.find((s) => s.id === skillId);
      if (exact) return exact;
      const n = normalizeSkillId(skillId);
      return skillsData.find((s) => normalizeSkillId(s.id) === n);
    })
    .filter((skill): skill is T => skill !== undefined);
}

export function projectMatchesSkill(
  project: { skills: string[] },
  skillId: string
): boolean {
  const normalizedSkillId = normalizeSkillId(skillId);
  return project.skills.some(
    (projectSkill) => normalizeSkillId(projectSkill) === normalizedSkillId
  );
}

export function hasAnyProjectForSkill(skillId: string): boolean {
  return projects.some((project) => projectMatchesSkill(project, skillId));
}

export function scrollToProjectsSection(): void {
  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
}
