import { SubHeading, BodyText } from '@/components';
import { en } from '@/language';

/** Card component displaying about information with tagline and personal details. */
export default function AboutMeCard() {
  return (
    <div className="card-surface flex w-full max-w-md flex-col gap-8 overflow-hidden p-8">
      {/* Tagline */}
      <SubHeading className="text-brand-600 dark:text-brand-400 text-base font-bold italic sm:text-lg md:text-xl">
        {en.aboutSection.tagline}
      </SubHeading>

      {/* What drives me */}
      <div className="flex flex-col gap-2">
        <SubHeading className="text-sm font-semibold leading-tight tracking-tight sm:text-base md:text-lg">
          {en.aboutSection.whatDrivesMeHeading}
        </SubHeading>
        <BodyText className="text-sm leading-relaxed sm:text-sm md:text-sm">
          {en.aboutSection.whatDrivesMeText}
        </BodyText>
      </div>

      {/* Beyond coding */}
      <div className="flex flex-col gap-2">
        <SubHeading className="text-sm font-semibold leading-tight tracking-tight sm:text-base md:text-lg">
          {en.aboutSection.beyondCodingHeading}
        </SubHeading>
        <div className="font-body text-sm leading-relaxed text-neutral-900 dark:text-neutral-200 sm:text-sm md:text-sm">
          <p className="mb-1">{en.aboutSection.beyondCodingIntro}</p>
          <ul className="ml-4 list-disc space-y-1">
            {en.aboutSection.beyondCodingItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Levelling up in life */}
      <div className="flex flex-col gap-2">
        <SubHeading className="text-sm font-semibold leading-tight tracking-tight sm:text-base md:text-lg">
          {en.aboutSection.levellingUpHeading}
        </SubHeading>
        <BodyText className="text-sm leading-relaxed sm:text-sm md:text-sm">
          {en.aboutSection.levellingUpText}
        </BodyText>
      </div>
    </div>
  );
}
