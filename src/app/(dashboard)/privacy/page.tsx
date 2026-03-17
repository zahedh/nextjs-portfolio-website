import type { Metadata } from 'next';
import { Section } from '@/components';
import { SubHeading, BodyText } from '@/components/text';
import { en } from '@/language';

export const metadata: Metadata = {
  title: 'Privacy Policy | Zahed Heidari',
  description:
    'Privacy policy for zahedheidari.co.uk. How we handle your data when you use this portfolio website.',
};

export default function PrivacyPage() {
  const lastUpdatedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="screen-parent">
      <Section
        title={en.privacyPage.title}
        showDivider={true}
        showBottomDivider={true}
      >
        <div className="card-surface mx-auto max-w-3xl p-6 md:p-8">
          <BodyText className="card-meta mb-6">
            {en.privacyPage.lastUpdatedLabel} {lastUpdatedDate}
          </BodyText>

          <BodyText className="mb-8">{en.privacyPage.intro}</BodyText>

          <SubHeading className="card-section-heading">
            {en.privacyPage.sectionInfoWeCollect}
          </SubHeading>
          <BodyText className="card-description mb-4">
            {en.privacyPage.infoWeCollectIntro}
          </BodyText>
          <ul className="card-list">
            <li className="mb-2">
              <strong>{en.privacyPage.themePreferenceLabel}</strong> —{' '}
              {en.privacyPage.themePreferenceDetail}
            </li>
          </ul>

          <SubHeading className="card-section-heading">
            {en.privacyPage.sectionHowWeUse}
          </SubHeading>
          <BodyText className="card-description mb-6">
            {en.privacyPage.howWeUseText}
          </BodyText>

          <SubHeading className="card-section-heading">
            {en.privacyPage.sectionThirdParty}
          </SubHeading>
          <BodyText className="card-description mb-4">
            {en.privacyPage.thirdPartyIntro}
          </BodyText>
          <BodyText className="card-description mb-6">
            {en.privacyPage.thirdPartyFuture}
          </BodyText>

          <SubHeading className="card-section-heading">
            {en.privacyPage.sectionYourRights}
          </SubHeading>
          <BodyText className="card-description mb-6">
            {en.privacyPage.yourRightsText}
          </BodyText>

          <SubHeading className="card-section-heading">
            {en.privacyPage.sectionChanges}
          </SubHeading>
          <BodyText className="card-description mb-6">
            {en.privacyPage.changesText}
          </BodyText>

          <BodyText className="card-footer-note">
            {en.privacyPage.contactIntro}{' '}
            <a
              href={`mailto:${en.privacyPage.contactEmail}`}
              className="link-accent"
            >
              {en.privacyPage.contactEmail}
            </a>
            .
          </BodyText>
        </div>
      </Section>
    </div>
  );
}
