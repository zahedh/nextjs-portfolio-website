import { Section } from '@/components';
import { en } from '@/language';
import { fetchGitHubContributions, transformContributionsData } from '@/lib';
import ContributionsCalendar from './ContributionsCalendar';

/** Section for open-source and community contributions. */
export default async function ContributionsSection() {
  const calendar = await fetchGitHubContributions();
  const activities = transformContributionsData(calendar);

  return (
    <Section
      anchor="contributions"
      title={en.sectionHeaders.contributionsSection}
    >
      <div className="section-content flex w-full justify-center">
        <div className="w-full">
          {activities.length > 0 ? (
            <ContributionsCalendar activities={activities} />
          ) : (
            <p className="text-center text-neutral-600 dark:text-neutral-400">
              Unable to load contribution data. Please try again later.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
