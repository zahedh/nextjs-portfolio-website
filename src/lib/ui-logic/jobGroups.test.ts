import { JobExperience } from '@/types/experience';
import { groupJobsByCompany } from './jobGroups';

function job(overrides: Partial<JobExperience>): JobExperience {
  return {
    id: 'id',
    title: 'Developer',
    company: 'Acme',
    location: 'Leeds, UK',
    startDate: 'Jan 2020',
    endDate: 'Jan 2021',
    summary: '',
    description: [],
    skills: [],
    ...overrides,
  };
}

describe('groupJobsByCompany', () => {
  it('GIVEN consecutive roles at one employer WHEN grouping THEN they form a single run', () => {
    const groups = groupJobsByCompany([
      job({
        id: 'a',
        company: 'Acme',
        startDate: 'Mar 2023',
        endDate: 'Present',
      }),
      job({
        id: 'b',
        company: 'Acme',
        startDate: 'May 2020',
        endDate: 'Mar 2023',
      }),
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0].jobs.map((entry) => entry.id)).toEqual(['a', 'b']);
    expect(groups[0].span).toBe('2020 — Present');
  });

  it('GIVEN a return to a former employer WHEN grouping THEN the runs stay separate', () => {
    const groups = groupJobsByCompany([
      job({ id: 'a', company: 'Acme' }),
      job({ id: 'b', company: 'Globex' }),
      job({ id: 'c', company: 'Acme' }),
    ]);

    expect(groups.map((group) => group.company)).toEqual([
      'Acme',
      'Globex',
      'Acme',
    ]);
  });

  it('GIVEN every role WHEN grouping THEN none is lost', () => {
    const jobs = [
      job({ id: 'a', company: 'Acme' }),
      job({ id: 'b', company: 'Acme' }),
      job({ id: 'c', company: 'Globex' }),
    ];

    expect(
      groupJobsByCompany(jobs).flatMap((group) => group.jobs)
    ).toHaveLength(jobs.length);
  });
});
