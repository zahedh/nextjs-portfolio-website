import Link from 'next/link';
import { en } from '@/language';
import { BodyText, SubHeading } from '@/components/text';
import { PrimaryButton, TertiaryButton } from '@/components/ui';
import { Download, Mail } from 'lucide-react';

/** Site footer with copyright and secondary navigation. */
export default function Footer() {
  return (
    <footer className="mt-rhythm text-center text-neutral-900" id="contact">
      <div className="footer-container">
        <SubHeading as="h2" className="footer-heading">
          {en.footerSection.heading}
        </SubHeading>
        <BodyText className="footer-copy">
          {en.footerSection.supportingText}
        </BodyText>

        <div className="footer-actions">
          <PrimaryButton
            hyperlink={`mailto:${en.footerSection.email}`}
            className="footer-action"
          >
            <Mail aria-hidden className="size-4" />
            {en.footerSection.emailLabel}
          </PrimaryButton>
          <TertiaryButton
            hyperlink="/documents/CV.pdf"
            target="_blank"
            className="footer-action footer-action-secondary"
            icon={<Download aria-hidden className="size-4" />}
          >
            {en.footerSection.downloadCVLabel}
          </TertiaryButton>
        </div>

        <nav
          className="footer-social-links"
          aria-label={en.footerSection.socialLinksAriaLabel}
        >
          <a
            href="https://www.linkedin.com/in/zahed-heidari-56602b183/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            {en.footerSection.linkedInLabel}
          </a>
          <a
            href="https://github.com/zahedh"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            {en.footerSection.gitHubLabel}
          </a>
          <a
            href="https://sessionize.com/zahedheidari/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            {en.footerSection.sessionizeLabel}
          </a>
        </nav>

        <div className="footer-meta">
          <span>{en.footerSection.copyrightText}</span>
          <Link href="/privacy" className="link-accent">
            {en.footerSection.privacyLinkLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
