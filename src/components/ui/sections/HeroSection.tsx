import { Heading, Section, SubHeading } from '@/components';
import { AvatarGraphic } from '@/components/media';
import { en } from '@/language';

export default function HeroSection() {
  return (
    <Section anchor="home" showDivider={false}>
      <div className="section-content flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
        <AvatarGraphic className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48" />
        <div className="flex flex-col text-center sm:text-left">
          <SubHeading>{en.heroSection.header}</SubHeading>
          <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:items-baseline">
            <SubHeading>{en.heroSection.subHeaderPartOne}</SubHeading>
            <Heading className="text-brand-600 dark:text-brand-300">
              {en.heroSection.subHeaderPartTwo}
            </Heading>
          </div>
          <SubHeading className="t-md mt-4 max-w-2xl">
            {en.heroSection.supportingText}
          </SubHeading>
        </div>
      </div>
    </Section>
  );
}
