import { NextRequest, NextResponse } from 'next/server';
import {
  fetchGitHubContributions,
  transformContributionsData,
} from '@/lib/api/githubApi';

/** GitHub opened in 2008; nothing before it, and nothing after this year. */
const FIRST_YEAR = 2008;

/**
 * Serves one year of GitHub contributions to the browser. `year` defaults to
 * the current year; anything that is not a year GitHub could hold is a 400,
 * and a failure upstream is a 502.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const currentYear = new Date().getFullYear();
  const yearParam = request.nextUrl.searchParams.get('year');
  const year = yearParam === null ? currentYear : Number(yearParam);

  if (!Number.isInteger(year) || year < FIRST_YEAR || year > currentYear) {
    return NextResponse.json({ activities: [] }, { status: 400 });
  }

  try {
    const calendar = await fetchGitHubContributions(year);
    return NextResponse.json({
      activities: transformContributionsData(calendar),
    });
  } catch (error) {
    // The only record of an upstream failure, in the platform's function logs.
    console.error('Contributions unavailable:', error);
    return NextResponse.json({ activities: [] }, { status: 502 });
  }
}
