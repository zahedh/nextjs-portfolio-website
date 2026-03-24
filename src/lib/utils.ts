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

const SMOOTH_SCROLL_MAX_DISTANCE_RATIO = 1.5;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollBehaviorForDistance(distancePx: number): ScrollBehavior {
  if (prefersReducedMotion()) return 'auto';
  const maxDistance = window.innerHeight * SMOOTH_SCROLL_MAX_DISTANCE_RATIO;
  return distancePx <= maxDistance ? 'smooth' : 'auto';
}

/** Scrolls an element into view; smooth only for short travel, instant for long jumps. */
export function scrollElementIntoViewAdaptive(el: Element): void {
  const rect = el.getBoundingClientRect();
  const distance = Math.abs(rect.top);
  const behavior = scrollBehaviorForDistance(distance);
  el.scrollIntoView({ behavior, block: 'start' });
}

function anchorSelectorFromHref(href: string): string | null {
  const i = href.indexOf('#');
  if (i === -1) return null;
  const hash = href.slice(i);
  if (hash.length <= 1) return null;
  return hash;
}

/**
 * In-page anchor navigation: smooth only for short scroll distance; long jumps use instant scroll.
 * @param e - React mouse event from clicking an anchor link
 */
export function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (!href) return;
  const selector = anchorSelectorFromHref(href);
  if (!selector) return;
  const el = document.querySelector(selector);
  if (!el) return;
  scrollElementIntoViewAdaptive(el);
}

/**
 * Scrolls to the top of the page; smooth only when already near the top.
 * @param e - Optional React mouse event to prevent default behavior
 */
export function scrollToTop(e?: React.MouseEvent<HTMLAnchorElement>) {
  e?.preventDefault();
  const distance = window.scrollY;
  const behavior = scrollBehaviorForDistance(distance);
  window.scrollTo({ top: 0, behavior });
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
  const el = document.querySelector('#projects');
  if (!el) return;
  scrollElementIntoViewAdaptive(el);
}
