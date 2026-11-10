import type { Metadata } from 'next';
import { socialShareImageMeta } from '@/lib/meta';
import { en } from '@/language';

const title = en.siteMetadata.pageTitle.replace(
  '{{page}}',
  en.privacyPage.title
);
const description = en.privacyPage.metaDescription;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title,
    description,
    url: '/privacy',
    type: 'website',
    images: [socialShareImageMeta],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [socialShareImageMeta],
  },
};

export default function PrivacyPage() {
  return (
    <div className="screen-parent">
      {/* Cancels the shell's header offset, as a project page does. */}
      <section className="screen-section -mt-18">
        <div className="section-inner">
          <div className="page-stack">
            <div className="page-head">
              <h1 className="page-title">{en.privacyPage.title}</h1>
              <p className="page-summary">{en.privacyPage.intro}</p>
              <p className="page-meta">
                {en.privacyPage.lastUpdatedLabel} {en.privacyPage.lastUpdated}
              </p>
            </div>

            <div className="page-column">
              <section className="page-block">
                <h2 className="page-heading">
                  {en.privacyPage.sectionInfoWeCollect}
                </h2>
                <p className="page-prose">
                  {en.privacyPage.infoWeCollectIntro}
                </p>
                <ul className="page-prose page-list">
                  <li>
                    <strong>{en.privacyPage.themePreferenceLabel}:</strong>{' '}
                    {en.privacyPage.themePreferenceDetail}
                  </li>
                </ul>
              </section>

              <section className="page-block">
                <h2 className="page-heading">
                  {en.privacyPage.sectionHowWeUse}
                </h2>
                <p className="page-prose">{en.privacyPage.howWeUseText}</p>
              </section>

              <section className="page-block">
                <h2 className="page-heading">
                  {en.privacyPage.sectionThirdParty}
                </h2>
                <p className="page-prose">{en.privacyPage.thirdPartyIntro}</p>
                <p className="page-prose">
                  {en.privacyPage.thirdPartyAnalytics}
                  <a
                    href={en.privacyPage.thirdPartyVercelLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent"
                  >
                    {en.privacyPage.thirdPartyVercelLinkLabel}
                  </a>
                  .
                </p>
              </section>

              <section className="page-block">
                <h2 className="page-heading">
                  {en.privacyPage.sectionYourRights}
                </h2>
                <p className="page-prose">{en.privacyPage.yourRightsText}</p>
              </section>

              <section className="page-block">
                <h2 className="page-heading">
                  {en.privacyPage.sectionChanges}
                </h2>
                <p className="page-prose">{en.privacyPage.changesText}</p>
              </section>

              <p className="page-prose">
                {en.privacyPage.contactIntro}{' '}
                <a
                  href={`mailto:${en.privacyPage.contactEmail}`}
                  className="link-accent"
                >
                  {en.privacyPage.contactEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
