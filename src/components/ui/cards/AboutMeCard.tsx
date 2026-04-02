import { SubHeading, BodyText } from '@/components';
import { en } from '@/language';

/** Main About narrative — shares surface-card language with Projects and Highlights. */
export default function AboutMeCard() {
  return (
    <article className="surface-card flex w-full flex-col gap-5 overflow-hidden p-5 sm:p-6 md:gap-6">
      <div className="flex max-w-prose flex-col gap-5 md:mx-0">
        <SubHeading className="text-brand-600 dark:text-brand-400 text-center text-base font-bold italic sm:text-lg md:text-xl">
          {en.aboutSection.tagline}
        </SubHeading>

        <div className="flex flex-col gap-2">
          <SubHeading className="text-sm leading-tight font-semibold tracking-tight sm:text-base md:text-lg">
            {en.aboutSection.whatDrivesMeHeading}
          </SubHeading>
          <BodyText className="text-sm leading-relaxed sm:text-sm md:text-sm">
            {en.aboutSection.whatDrivesMeText}
          </BodyText>
        </div>

        <div className="flex flex-col gap-3">
          <SubHeading className="text-sm leading-tight font-semibold tracking-tight sm:text-base md:text-lg">
            {en.aboutSection.beyondCodingHeading}
          </SubHeading>
          <div className="font-body text-sm leading-relaxed text-neutral-900 sm:text-sm md:text-sm dark:text-neutral-200">
            <p className="mb-2">{en.aboutSection.beyondCodingIntro}</p>
            <ul className="marker:text-brand-500/80 ml-1 list-disc space-y-2 pl-5">
              {en.aboutSection.beyondCodingItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <SubHeading className="text-sm leading-tight font-semibold tracking-tight sm:text-base md:text-lg">
            {en.aboutSection.levellingUpHeading}
          </SubHeading>
          <BodyText className="text-sm leading-relaxed sm:text-sm md:text-sm">
            {en.aboutSection.levellingUpText}
          </BodyText>
        </div>
      </div>
    </article>
  );
}
