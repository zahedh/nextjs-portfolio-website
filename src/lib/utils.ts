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
  return (keyboardEvent: KeyboardEvent) => {
    if (keyboardEvent.key === 'Escape') {
      callback();
    }
  };
}

const SMOOTH_SCROLL_MAX_DISTANCE_RATIO = 1.5;

/** Matches Tailwind `lg` — below this, long smooth scroll is more likely to jank. */
function isNarrowViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 1023px)').matches;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Shared distance cap for “short enough to smooth” (mobile section links + desktop scroll-to-top). */
function scrollBehaviorForDistance(distancePx: number): ScrollBehavior {
  if (prefersReducedMotion()) return 'auto';
  const maxDistance = window.innerHeight * SMOOTH_SCROLL_MAX_DISTANCE_RATIO;
  return distancePx <= maxDistance ? 'smooth' : 'auto';
}

/**
 * Section / in-page anchors: always smooth on wide viewports; on narrow, same distance cap as before.
 */
function scrollBehaviorForAnchor(distancePx: number): ScrollBehavior {
  if (prefersReducedMotion()) return 'auto';
  if (!isNarrowViewport()) {
    return 'smooth';
  }
  return scrollBehaviorForDistance(distancePx);
}

/**
 * Home / scroll-to-top: stricter on mobile (smooth only when already near the top); desktop uses distance cap.
 */
function scrollToTopBehavior(): ScrollBehavior {
  if (prefersReducedMotion()) return 'auto';
  const distance = window.scrollY;
  if (isNarrowViewport()) {
    const maxSmooth = window.innerHeight * 0.4;
    return distance <= maxSmooth ? 'smooth' : 'auto';
  }
  return scrollBehaviorForDistance(distance);
}

/** Scrolls an element into view (section anchors). */
export function scrollElementIntoViewAdaptive(element: Element): void {
  const rect = element.getBoundingClientRect();
  const distance = Math.abs(rect.top);
  const behavior = scrollBehaviorForAnchor(distance);
  element.scrollIntoView({ behavior, block: 'start' });
}

function anchorSelectorFromHref(href: string): string | null {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return null;
  const hash = href.slice(hashIndex);
  if (hash.length <= 1) return null;
  return hash;
}

/**
 * In-page anchor navigation: smooth on desktop; on mobile, long jumps use instant scroll.
 * @param mouseEvent - React mouse event from clicking an anchor link
 */
export function handleSmoothScroll(
  mouseEvent: React.MouseEvent<HTMLAnchorElement>
) {
  mouseEvent.preventDefault();
  const href = mouseEvent.currentTarget.getAttribute('href');
  if (!href) return;
  const selector = anchorSelectorFromHref(href);
  if (!selector) return;
  const element = document.querySelector(selector);
  if (!element) return;
  scrollElementIntoViewAdaptive(element);
}

/**
 * Scrolls to the top of the page. On mobile, smooth only when already near the top.
 * @param mouseEvent - Optional React mouse event to prevent default behavior
 */
export function scrollToTop(mouseEvent?: React.MouseEvent<HTMLAnchorElement>) {
  mouseEvent?.preventDefault();
  window.scrollTo({ top: 0, behavior: scrollToTopBehavior() });
}

function normalizeSkillId(rawId: string): string {
  return rawId
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
      const exact = skillsData.find((skill) => skill.id === skillId);
      if (exact) return exact;
      const normalized = normalizeSkillId(skillId);
      return skillsData.find(
        (skill) => normalizeSkillId(skill.id) === normalized
      );
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
  const element = document.querySelector('#projects');
  if (!element) return;
  scrollElementIntoViewAdaptive(element);
}
