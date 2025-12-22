import { Section } from '@/components';
import { en } from '@/language';

/** Section for open-source and community contributions. */
export default function ContributionsSection() {
  return (
    <Section
      anchor="contributions"
      title={en.sectionHeaders.contributionsSection}
    ></Section>
  );
}
