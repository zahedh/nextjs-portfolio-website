import { ActivityCalendarData } from '@/types/github';

/** One column of the grid: seven weekday slots, `null` where the run has no day. */
export type ContributionWeek = (ActivityCalendarData | null)[];

/** One run of consecutive weeks belonging to the same month. */
export type ContributionMonth = {
  key: string;
  label: string;
  span: number;
};

export type ContributionGrid = {
  weeks: ContributionWeek[];
  months: ContributionMonth[];
};

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** A month narrower than this has no room to print its name. */
const MIN_WEEKS_FOR_LABEL = 2;

/**
 * Parses an ISO date as UTC. Reading `2026-01-01` with the local calendar
 * shifts it a day west of Greenwich, which moves the whole grid by a weekday.
 */
function parseUtcDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

/**
 * Lays contribution days out as weekday-aligned columns, and derives the month
 * row from those same columns so a label cannot drift from the data beneath it.
 */
export function buildContributionGrid(
  activities: ActivityCalendarData[]
): ContributionGrid {
  if (activities.length === 0) return { weeks: [], months: [] };

  const days = [...activities].sort((first, second) =>
    first.date.localeCompare(second.date)
  );

  const weeks: ContributionWeek[] = [];
  let current: ContributionWeek = Array(
    parseUtcDate(days[0].date).getUTCDay()
  ).fill(null);

  days.forEach((day) => {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  });

  if (current.length > 0) {
    weeks.push([...current, ...Array(7 - current.length).fill(null)]);
  }

  const months: ContributionMonth[] = [];

  weeks.forEach((week) => {
    const firstDay = week.find((day) => day !== null);
    if (!firstDay) return;

    const date = parseUtcDate(firstDay.date);
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    const previous = months[months.length - 1];

    if (previous && previous.key === key) {
      previous.span += 1;
      return;
    }

    months.push({ key, label: MONTH_LABELS[date.getUTCMonth()], span: 1 });
  });

  months.forEach((month) => {
    if (month.span < MIN_WEEKS_FOR_LABEL) month.label = '';
  });

  return { weeks, months };
}
