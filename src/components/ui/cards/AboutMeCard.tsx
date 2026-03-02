import { SubHeading, BodyText } from '@/components';
import { en } from '@/language';

/** Card component displaying about information with tagline and personal details. */
export default function AboutMeCard() {
  return (
    <div className="border-brand-300 flex w-full max-w-md flex-col gap-8 overflow-hidden rounded-2xl border bg-neutral-100 p-8 shadow-md lg:max-w-md dark:bg-neutral-900">
      {/* Tagline */}
      <SubHeading className="text-brand-600 dark:text-brand-400 font-bold italic">
        {en.aboutSection.tagline}
      </SubHeading>

      {/* What drives me */}
      <div className="flex flex-col gap-2">
        <SubHeading className="t-md font-semibold">
          {en.aboutSection.whatDrivesMeHeading}
        </SubHeading>
        <BodyText className="text-sm leading-relaxed">
          {en.aboutSection.whatDrivesMeText}
        </BodyText>
      </div>

      {/* Beyond coding */}
      <div className="flex flex-col gap-2">
        <SubHeading className="t-md font-semibold">
          {en.aboutSection.beyondCodingHeading}
        </SubHeading>
        <BodyText as="div" className="text-sm leading-relaxed">
          <p className="mb-1">{en.aboutSection.beyondCodingIntro}</p>
          <ul className="ml-4 list-disc space-y-1">
            {en.aboutSection.beyondCodingItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </BodyText>
      </div>

      {/* Levelling up in life */}
      <div className="flex flex-col gap-2">
        <SubHeading className="t-md font-semibold">
          {en.aboutSection.levellingUpHeading}
        </SubHeading>
        <BodyText className="text-sm leading-relaxed">
          {en.aboutSection.levellingUpText}
        </BodyText>
      </div>
    </div>
  );
}
