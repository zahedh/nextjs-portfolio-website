import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubContributions, transformContributionsData } from '@/lib';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const yearParam = searchParams.get('year');
  const year = yearParam ? parseInt(yearParam, 10) : undefined;

  try {
    const calendar = await fetchGitHubContributions(year);
    const activities = transformContributionsData(calendar);

    return NextResponse.json({ activities, success: true });
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return NextResponse.json(
      {
        activities: [],
        success: false,
        error: 'Failed to fetch contributions',
      },
      { status: 500 }
    );
  }
}
