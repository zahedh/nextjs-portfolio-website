/**
 * GitHub API utilities for fetching contribution data.
 */

import type {
  GitHubContributionCalendar,
  ActivityCalendarData,
} from '@/types/github';

const GITHUB_API = 'https://api.github.com/graphql';
const GITHUB_USERNAME = 'zahedh';

/**
 * Fetches GitHub contribution data using GraphQL API.
 * Requires GITHUB_TOKEN in environment variables.
 * @param year - Optional year to fetch contributions for (defaults to current year)
 */
export async function fetchGitHubContributions(year?: number) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn(
      'GITHUB_TOKEN not found. GitHub contributions cannot be displayed without authentication.'
    );
    console.warn('Create a token at: https://github.com/settings/tokens');
    console.warn('Add it to .env.local as: GITHUB_TOKEN=your_token_here');
    return null;
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // Calculate date range for the year
  const fromDate = year
    ? `${year}-01-01T00:00:00Z`
    : `${new Date().getFullYear()}-01-01T00:00:00Z`;
  const toDate = year
    ? `${year}-12-31T23:59:59Z`
    : `${new Date().getFullYear()}-12-31T23:59:59Z`;

  const query = `
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

  try {
    const response = await fetch(GITHUB_API, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: {
          userName: GITHUB_USERNAME,
          from: fromDate,
          to: toDate,
        },
      }),
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return null;
    }

    if (!data.data?.user?.contributionsCollection?.contributionCalendar) {
      console.error('Unexpected API response structure:', data);
      return null;
    }

    return data.data.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error('Failed to fetch GitHub contributions:', error);
    return null;
  }
}

/**
 * Transforms GitHub contribution data to react-activity-calendar format.
 */
export function transformContributionsData(
  calendar: GitHubContributionCalendar | null
): ActivityCalendarData[] {
  if (!calendar?.weeks) return [];

  const activities: Array<{ date: string; count: number; level: number }> = [];

  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      // Calculate level (0-4) based on contribution count
      let level = 0;
      if (day.contributionCount > 0) level = 1;
      if (day.contributionCount >= 3) level = 2;
      if (day.contributionCount >= 6) level = 3;
      if (day.contributionCount >= 9) level = 4;

      activities.push({
        date: day.date,
        count: day.contributionCount,
        level,
      });
    }
  }

  return activities;
}
