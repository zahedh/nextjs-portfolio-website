'use client';

import { BodyText, Section, SubHeading } from '@/components';
import { AvatarGraphic } from '@/components/media';
import { HeroFloatingOrbs } from '@/components/ui/animations';
import { en } from '@/language';
import { WavingHand } from '../animations/WavingHand';
import { AnimatedText } from '../animations/AnimatedText';

/** Hero section introducing the portfolio and primary value proposition. */
export default function HeroSection() {
  return (
    <Section anchor="home" showDivider={false}>
      <div className="section-content relative flex w-full flex-col items-center justify-center gap-10 overflow-hidden sm:flex-row">
        <HeroFloatingOrbs />

        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-10 sm:flex-row">
          <AvatarGraphic className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48" />
          <div className="flex flex-col text-center sm:text-left">
            <SubHeading as="h1">
              {en.heroSection.header}
              <WavingHand />
            </SubHeading>
            <h2 className="font-heading mt-6 flex flex-col items-center gap-2 text-center text-lg leading-tight font-semibold tracking-tight text-neutral-900 sm:flex-row sm:items-baseline sm:text-left sm:text-xl md:text-2xl dark:text-neutral-200">
              <span>{en.heroSection.subHeaderPartOne}</span>
              <span className="text-brand-600 dark:text-brand-300">
                <AnimatedText
                  delay={1.4}
                  text={en.heroSection.subHeaderPartTwo}
                />
              </span>
            </h2>
            <BodyText className="mt-4 max-w-2xl text-center text-base leading-normal tracking-tight sm:text-left sm:text-lg md:text-xl">
              <AnimatedText delay={2.4} text={en.heroSection.supportingText} />
            </BodyText>
          </div>
        </div>
      </div>
    </Section>
  );
}
