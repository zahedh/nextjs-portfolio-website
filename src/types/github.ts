/**
 * GitHub contribution types
 */

export interface GitHubContributionDay {
  contributionCount: number;
  date: string;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

export interface ActivityCalendarData {
  date: string;
  count: number;
  level: number;
}
