'use client';

import {
  BodyText,
  Heading,
  PrimaryButton,
  Section,
  TertiaryButton,
} from '@/components';
import { HeroFloatingOrbs } from '@/components/ui/animations';
import { en } from '@/language';
import { handleSmoothScroll } from '@/lib/utils';
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
  return (
    <Section anchor="home" showDivider={false} className="-mt-18">
      <div className="hero-composition">
        <HeroFloatingOrbs />

        <div className="hero-visual visual-placeholder" aria-hidden />

        <div className="hero-copy">
          <p className="hero-eyebrow">{en.heroSection.eyebrow}</p>
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
              className="hero-action"
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
