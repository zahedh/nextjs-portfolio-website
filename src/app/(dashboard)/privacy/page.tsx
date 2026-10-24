import type { Metadata } from 'next';
import { socialShareImageMeta } from '@/lib/meta';
import { en } from '@/language';

export const metadata: Metadata = {
  title: 'Privacy Policy | Zahed Heidari',
  description:
    'Privacy policy for zahedheidari.co.uk. How we handle your data when you use this portfolio website.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Zahed Heidari',
    description:
      'Privacy policy for zahedheidari.co.uk. How we handle your data when you use this portfolio website.',
    url: '/privacy',
    type: 'website',
    images: [socialShareImageMeta],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Zahed Heidari',
    description:
      'Privacy policy for zahedheidari.co.uk. How we handle your data when you use this portfolio website.',
    images: [socialShareImageMeta],
  },
};

export default function PrivacyPage() {
  const p = en.privacyPage;

  return (
    <div className="screen-parent">
      {/* Cancels the shell's header offset, as a project page does. */}
      <section className="screen-section -mt-18">
        <div className="section-inner">
          <div className="page-stack">
            <div className="page-head">
              <h1 className="page-title">{p.title}</h1>
              <p className="page-summary">{p.intro}</p>
              <p className="page-meta">
                {p.lastUpdatedLabel} {p.lastUpdated}
              </p>
            </div>

            <div className="page-column">
              <section className="page-block">
                <h2 className="page-heading">{p.sectionInfoWeCollect}</h2>
                <p className="page-prose">{p.infoWeCollectIntro}</p>
                <ul className="page-prose page-list">
                  <li>
                    <strong>{p.themePreferenceLabel}:</strong>{' '}
                    {p.themePreferenceDetail}
                  </li>
                </ul>
              </section>

              <section className="page-block">
                <h2 className="page-heading">{p.sectionHowWeUse}</h2>
                <p className="page-prose">{p.howWeUseText}</p>
              </section>

              <section className="page-block">
                <h2 className="page-heading">{p.sectionThirdParty}</h2>
                <p className="page-prose">{p.thirdPartyIntro}</p>
                <p className="page-prose">
                  {p.thirdPartyFuture}
                  <a
                    href={p.thirdPartyVercelLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent"
                  >
                    {p.thirdPartyVercelLinkLabel}
                  </a>
                  .
                </p>
              </section>

              <section className="page-block">
                <h2 className="page-heading">{p.sectionYourRights}</h2>
                <p className="page-prose">{p.yourRightsText}</p>
              </section>

              <section className="page-block">
                <h2 className="page-heading">{p.sectionChanges}</h2>
                <p className="page-prose">{p.changesText}</p>
              </section>

              <p className="page-prose">
                {p.contactIntro}{' '}
                <a href={`mailto:${p.contactEmail}`} className="link-accent">
                  {p.contactEmail}
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
