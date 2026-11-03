import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * The type scale in `theme.css` adds font sizes tailwind-merge cannot infer.
 * Left unregistered it reads `text-heading` as a colour, so a colour later in
 * the same string silently drops the size. Every scale token is listed here.
 */
const TYPE_SCALE = [
  'micro',
  'meta',
  'caption',
  'body-sm',
  'body',
  'lead',
  'title-sm',
  'title',
  'heading',
  'heading-lg',
  'display',
  'display-lg',
  'numeral',
  'numeral-lg',
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: TYPE_SCALE }],
    },
  },
});

/** Combines and intelligently merges Tailwind class names. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Normalises skill IDs for loose matching (e.g. `next.js` ↔ `nextjs`). */
export function normalizeSkillId(rawId: string): string {
  return rawId
    .toLowerCase()
    .replace(/[.\s-]/g, '')
    .trim();
}

/**
 * Maps skill IDs to their corresponding skill objects.
 * Normalises both sides so `React Native` and `react-native` match.
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

/** Totals a contribution calendar. Equals GitHub's own `totalContributions`. */
export function sumContributions(activities: { count: number }[]): number {
  return activities.reduce((total, activity) => total + activity.count, 0);
}

const NUMBER_WORDS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
] as const;

/**
 * Spells a small whole number as a word, for copy that reads as a sentence
 * rather than a statistic ("six years", not "6 years"). Falls back to digits
 * past twenty, where a spelled number stops reading well anyway.
 */
export function spellNumber(value: number): string {
  return NUMBER_WORDS[value] ?? String(value);
}

/** Upper-cases the first character, for a word that opens a sentence. */
export function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
