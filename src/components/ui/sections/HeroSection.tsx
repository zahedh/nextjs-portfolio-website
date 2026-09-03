'use client';

import {
  BodyText,
  Heading,
  PrimaryButton,
  Section,
  TertiaryButton,
} from '@/components';
import { AvatarGraphic } from '@/components/media';
import { HeroFloatingOrbs } from '@/components/ui/animations';
import { en } from '@/language';
import { handleSmoothScroll } from '@/lib/utils';

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

/** Hero section introducing the portfolio and primary value proposition. */
export default function HeroSection() {
  return (
    <Section anchor="home" showDivider={false}>
      <div className="hero-composition">
        <HeroFloatingOrbs />

        {/* Avatar placeholder; the finished hero visual replaces this in the same slot. */}
        <AvatarGraphic
          priority
          sizes="(max-width: 1023px) 214px, (max-width: 1279px) 268px, (max-width: 1535px) 340px, 420px"
          className="hero-visual"
        />

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
