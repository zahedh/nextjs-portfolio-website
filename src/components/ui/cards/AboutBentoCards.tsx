import { BodyText, SubHeading } from '@/components';
import { en } from '@/language';
import { cn } from '@/lib/utils';

/** Pairs in the two-column grid — fill cell height on `lg`. */
const rowCardBase =
  'surface-card surface-card-interactive flex h-full min-h-0 min-w-0 flex-col gap-4 overflow-hidden p-6 sm:p-8 md:gap-5';

const fullWidthCardBase =
  'surface-card surface-card-interactive flex w-full min-w-0 flex-col gap-4 overflow-hidden p-6 sm:p-8 md:gap-5 lg:flex-none';

const aboutCardHeadingClass =
  'text-base leading-tight font-semibold tracking-tight sm:text-lg md:text-xl';

export function AboutWhatDrivesCard({ className }: { className?: string }) {
  return (
    <article className={cn(rowCardBase, className)}>
      <SubHeading
        as="h3"
        className={aboutCardHeadingClass}
      >
        {en.aboutSection.whatDrivesMeHeading}
      </SubHeading>
      <BodyText className="text-sm leading-relaxed">
        {en.aboutSection.whatDrivesMeText}
      </BodyText>
    </article>
  );
}

export function AboutBeyondCodingCard({ className }: { className?: string }) {
  return (
    <article className={cn(rowCardBase, className)}>
      <SubHeading
        as="h3"
        className={aboutCardHeadingClass}
      >
        {en.aboutSection.beyondCodingHeading}
      </SubHeading>
      <div className="font-body text-sm leading-relaxed text-neutral-900 sm:text-base md:text-lg dark:text-neutral-200">
        <p className="mb-2">{en.aboutSection.beyondCodingIntro}</p>
        <ul className="marker:text-brand-500/80 ml-1 list-disc space-y-2 pl-5">
          {en.aboutSection.beyondCodingItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Full-width row on `lg`. */
export function AboutLevellingUpCard({ className }: { className?: string }) {
  return (
    <article className={cn(fullWidthCardBase, className)}>
      <SubHeading
        as="h3"
        className={aboutCardHeadingClass}
      >
        {en.aboutSection.levellingUpHeading}
      </SubHeading>
      <BodyText className="text-sm leading-relaxed">
        {en.aboutSection.levellingUpText}
      </BodyText>
    </article>
  );
}
