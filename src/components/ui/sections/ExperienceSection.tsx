import { Section } from '@/components';
import { ExperienceRow } from '@/components/ui/cards';
import { jobExperiences } from '@/data';
import { groupJobsByCompany } from '@/lib/ui-logic';
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
              {group.jobs.map((job) => (
                <ExperienceRow key={job.id} job={job} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
