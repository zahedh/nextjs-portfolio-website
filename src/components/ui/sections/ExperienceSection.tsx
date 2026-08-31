import { Section } from '@/components';
import { JobCard, JobStack } from '@/components/ui/cards';
import { isJobActive, jobExperiences } from '@/data';
import { formatRoleDuration, startYear } from '@/lib/date';
import { groupJobsByCompany } from '@/lib/ui-logic';
import { cn } from '@/lib/utils';
import { en } from '@/language';

/** Professional experience as a timeline, grouped by employer. */
export default function ExperienceSection() {
  const groups = groupJobsByCompany(jobExperiences);

  return (
    <Section anchor="experience" title={en.sectionHeaders.experience}>
      <div className="experience-rail">
        {groups.map((group) => (
          <section className="experience-group" key={group.company}>
            <header className="experience-group-header">
              <h3 className="experience-group-company">{group.company}</h3>
              <p className="experience-group-meta">
                {group.location} <span aria-hidden="true">·</span> {group.span}
              </p>
            </header>

            <div className="experience-group-roles">
              {group.jobs.map((job) => {
                const active = isJobActive(job);
                return (
                  <div key={job.id} className="experience-rail-row">
                    <div
                      className={cn(
                        'experience-year',
                        active && 'experience-year-active'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'experience-dot',
                          active && 'experience-dot-active'
                        )}
                      />
                      {startYear(job.startDate)}
                      <span className="experience-duration">
                        {formatRoleDuration(job.startDate, job.endDate)}
                      </span>
                    </div>
                    <JobCard job={job} />
                    <JobStack skillIds={job.skills} />
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
