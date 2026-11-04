import 'server-only';

import {
  GitHubContributionCalendar,
  ActivityCalendarData,
} from '@/types/github';

const GITHUB_API = 'https://api.github.com/graphql';
const GITHUB_USERNAME = 'zahedh';

const CONTRIBUTIONS_QUERY = `
  query($userName:String!, $from:DateTime!, $to:DateTime!) {
    user(login: $userName) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

function isContributionCalendar(
  value: unknown
): value is GitHubContributionCalendar {
  if (typeof value !== 'object' || value === null) return false;
  const { weeks } = value as { weeks?: unknown };
  return (
    Array.isArray(weeks) &&
    weeks.every((week) => Array.isArray(week?.contributionDays))
  );
}

/**
 * Fetches one calendar year of contributions from GitHub's GraphQL API, cached
 * for a day. GraphQL refuses anonymous requests, so `GITHUB_TOKEN` is required.
 * Throws when the token is missing, GitHub refuses, or the answer has an
 * unexpected shape.
 */
export async function fetchGitHubContributions(
  year: number
): Promise<GitHubContributionCalendar> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is not set');

  const response = await fetch(GITHUB_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: {
        userName: GITHUB_USERNAME,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
      },
    }),
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`GitHub answered ${response.status}`);
  }

  const body: unknown = await response.json();
  const errors = (body as { errors?: unknown })?.errors;
  if (errors) {
    // GraphQL reports failures with a 200 and an errors array.
    throw new Error(`GitHub answered with errors: ${JSON.stringify(errors)}`);
  }
  const calendar = (
    body as {
      data?: {
        user?: { contributionsCollection?: { contributionCalendar?: unknown } };
      };
    }
  )?.data?.user?.contributionsCollection?.contributionCalendar;

  if (!isContributionCalendar(calendar)) {
    throw new Error('GitHub returned no contribution calendar');
  }
  return calendar;
}

/** Grades each day 0–4 by count, in the shape the contributions grid draws. */
export function transformContributionsData(
  calendar: GitHubContributionCalendar
): ActivityCalendarData[] {
  return calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => {
      const count = day.contributionCount;
      let level = 0;
      if (count > 0) level = 1;
      if (count >= 3) level = 2;
      if (count >= 6) level = 3;
      if (count >= 9) level = 4;
      return { date: day.date, count, level };
    })
  );
}
