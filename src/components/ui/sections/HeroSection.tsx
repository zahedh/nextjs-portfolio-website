'use client';

import {
  BodyText,
  Heading,
  PrimaryButton,
  Section,
  TertiaryButton,
} from '@/components';
import { HeroFloatingOrbs, Rocket } from '@/components/ui/animations';
import { en } from '@/language';
import { handleSmoothScroll } from '@/lib/utils';
import { useGlobalStore } from '@/providers/global-store-provider';
import { Download } from 'lucide-react';

function isAnchorMouseEvent(
  mouseEvent: React.MouseEvent<HTMLElement>
): mouseEvent is React.MouseEvent<HTMLAnchorElement> {
  return mouseEvent.currentTarget instanceof HTMLAnchorElement;
}

function handleProjectsClick(mouseEvent?: React.MouseEvent<HTMLElement>): void {
  if (mouseEvent && isAnchorMouseEvent(mouseEvent)) {
    handleSmoothScroll(mouseEvent);
  }
}

/**
 * Hero section introducing the portfolio and primary value proposition.
 *
 * The page wrapper already pads past the fixed header. The hero cancels that
 * clearance so it is not carried on top of the section's own padding, which
 * would leave the composition sitting low in its band.
 */
export default function HeroSection() {
  // The rocket takes the resolved theme rather than reading it itself; it
  // relights the running scene on a change instead of remounting. Before
  // hydration settles the theme this is the store's light default, which is
  // also what the canvas fades in from.
  const isDark = useGlobalStore((state) => state.isDark);

  return (
    <Section anchor="home" showDivider={false} className="-mt-18">
      <div className="hero-composition">
        <HeroFloatingOrbs />

        <Rocket theme={isDark ? 'dark' : 'light'} className="hero-visual" />

        <div className="hero-copy">
          {/* Name and role read as one identity block, tighter than the copy
              column's own rhythm, so the hero opens with a person rather than
              two unrelated preamble lines above the headline. */}
          <div className="hero-identity">
            <p className="hero-name">{en.heroSection.name}</p>
            <p className="hero-eyebrow">{en.heroSection.eyebrow}</p>
          </div>
          <Heading as="h1" className="hero-headline">
            {en.heroSection.headline}
          </Heading>
          <BodyText className="hero-supporting-text">
            {en.heroSection.supportingText}
          </BodyText>
          <div className="hero-actions">
            <PrimaryButton
              hyperlink="#projects"
              onClick={handleProjectsClick}
              className="hero-action"
            >
              {en.heroSection.primaryButton}
            </PrimaryButton>
            <TertiaryButton
              hyperlink="/documents/CV.pdf"
              aria-label={en.heroSection.downloadCvAriaLabel}
              icon={<Download aria-hidden className="size-4" />}
              className="hero-action btn-outline"
              {...{ download: true }}
            >
              {en.heroSection.secondaryButton}
            </TertiaryButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
