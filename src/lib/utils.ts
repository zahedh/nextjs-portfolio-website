import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['t-sm', 't-md', 't-lg', 't-xl', 't-2xl', 't-3xl'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
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
