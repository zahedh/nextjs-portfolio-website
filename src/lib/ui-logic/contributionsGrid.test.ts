import { ActivityCalendarData } from '@/types/github';
import { buildContributionGrid, buildEmptyYear } from './contributionsGrid';

/** Builds one activity per day across an inclusive ISO date range. */
function daysBetween(startIso: string, endIso: string): ActivityCalendarData[] {
  const days: ActivityCalendarData[] = [];
  const cursor = new Date(`${startIso}T00:00:00Z`);
  const end = new Date(`${endIso}T00:00:00Z`);

  while (cursor <= end) {
    days.push({ date: cursor.toISOString().slice(0, 10), count: 0, level: 0 });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return days;
}

describe('buildContributionGrid', () => {
  // 2026-01-01 is a Thursday and 2026-02-03 a Tuesday, so this range is padded
  // at both ends and gives February a single-week run.
  const activities = daysBetween('2026-01-01', '2026-02-03');

  it('GIVEN a run starting mid-week WHEN building THEN the first column is padded to its weekday', () => {
    const { weeks } = buildContributionGrid(activities);

    expect(weeks[0].slice(0, 4)).toEqual([null, null, null, null]);
    expect(weeks[0][4]?.date).toBe('2026-01-01');
  });

  it('GIVEN a run ending mid-week WHEN building THEN the last column is padded to seven', () => {
    const { weeks } = buildContributionGrid(activities);
    const last = weeks[weeks.length - 1];

    expect(weeks).toHaveLength(6);
    expect(last).toHaveLength(7);
    expect(last[2]?.date).toBe('2026-02-03');
    expect(last.slice(3)).toEqual([null, null, null, null]);
  });

  it('GIVEN any run WHEN building THEN every day sits on its own weekday row', () => {
    const { weeks } = buildContributionGrid(activities);

    weeks.forEach((week) => {
      week.forEach((day, weekday) => {
        if (!day) return;
        expect(new Date(`${day.date}T00:00:00Z`).getUTCDay()).toBe(weekday);
      });
    });
  });

  it('GIVEN a month spanning fewer than two weeks WHEN building THEN it prints no label', () => {
    const { months } = buildContributionGrid(activities);

    expect(months).toEqual([
      { key: '2026-0', label: 'Jan', span: 5 },
      { key: '2026-1', label: '', span: 1 },
    ]);
  });

  it('GIVEN no activities WHEN building THEN the grid is empty rather than throwing', () => {
    expect(buildContributionGrid([])).toEqual({ weeks: [], months: [] });
  });
});

describe('buildEmptyYear', () => {
  it('GIVEN a leap year WHEN building THEN it spans every day from January to December', () => {
    const days = buildEmptyYear(2024);

    expect(days).toHaveLength(366);
    expect(days[0].date).toBe('2024-01-01');
    expect(days[days.length - 1].date).toBe('2024-12-31');
  });

  it('GIVEN a common year WHEN building THEN every day is empty', () => {
    const days = buildEmptyYear(2026);

    expect(days).toHaveLength(365);
    expect(days.every((day) => day.count === 0 && day.level === 0)).toBe(true);
  });

  it('GIVEN an empty year WHEN laid out THEN it fills the same columns as real data', () => {
    const real = buildContributionGrid(daysBetween('2026-01-01', '2026-12-31'));
    const stand = buildContributionGrid(buildEmptyYear(2026));

    expect(stand.weeks).toHaveLength(real.weeks.length);
    expect(stand.months).toEqual(real.months);
  });
});
