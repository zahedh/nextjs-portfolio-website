import { formatRoleDuration, isOngoing, startYear } from './roleDuration';

const now = new Date(2026, 7, 31);

describe('formatRoleDuration', () => {
  it('GIVEN a span over a year WHEN formatting THEN it reads in years and months', () => {
    expect(formatRoleDuration('Mar 2023', 'Jul 2026', now)).toBe('3y 5m');
  });

  it('GIVEN a span under a year WHEN formatting THEN it reads in months alone', () => {
    expect(formatRoleDuration('Jul 2022', 'Mar 2023', now)).toBe('9m');
  });

  it('GIVEN a whole number of years WHEN formatting THEN the months are left off', () => {
    expect(formatRoleDuration('Jan 2020', 'Dec 2021', now)).toBe('2y');
  });

  it('GIVEN an ongoing role WHEN formatting THEN it counts up to today', () => {
    expect(formatRoleDuration('Jul 2026', 'Present', now)).toBe('2m');
  });

  it('GIVEN an unparseable date WHEN formatting THEN it yields nothing rather than guessing', () => {
    expect(formatRoleDuration('sometime', '2023', now)).toBe('');
  });
});

describe('isOngoing', () => {
  it('GIVEN present in any casing WHEN checked THEN the role is ongoing', () => {
    expect(isOngoing('Present')).toBe(true);
    expect(isOngoing(' present ')).toBe(true);
    expect(isOngoing('Jul 2026')).toBe(false);
  });
});

describe('startYear', () => {
  it('GIVEN a month and year WHEN read THEN only the year is returned', () => {
    expect(startYear('Mar 2023')).toBe('2023');
  });
});
