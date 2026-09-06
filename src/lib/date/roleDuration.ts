const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

/** Whether a role's end date means it is still running. */
export function isOngoing(endDate: string): boolean {
  return endDate.trim().toLowerCase() === 'present';
}

/**
 * Parses the `Mmm YYYY` form the experience data uses, returning the month
 * index since year zero so two dates can be subtracted directly.
 */
export function toMonthIndex(value: string, now: Date): number | null {
  if (isOngoing(value)) {
    return now.getFullYear() * 12 + now.getMonth();
  }
  const [month, year] = value.trim().split(/\s+/);
  const monthIndex = MONTHS.indexOf(month?.slice(0, 3).toLowerCase() ?? '');
  const yearNumber = Number(year);
  if (monthIndex < 0 || !Number.isFinite(yearNumber)) return null;
  return yearNumber * 12 + monthIndex;
}

/**
 * How long a role ran, counted inclusively as a CV would read it:
 * `2y 3m`, `9m`, or `3y` when it lands on a whole number of years.
 */
export function formatRoleDuration(
  startDate: string,
  endDate: string,
  now: Date = new Date()
): string {
  const start = toMonthIndex(startDate, now);
  const end = toMonthIndex(endDate, now);
  if (start === null || end === null || end < start) return '';

  const months = end - start + 1;
  const years = Math.floor(months / 12);
  const remainder = months % 12;

  if (years === 0) return `${remainder}m`;
  if (remainder === 0) return `${years}y`;
  return `${years}y ${remainder}m`;
}

/** The calendar year a role started, for the rail's year marker. */
export function startYear(startDate: string): string {
  return startDate.trim().split(/\s+/).pop() ?? '';
}
