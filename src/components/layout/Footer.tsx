import { en } from '@/language';
import { BodyText, SubHeading } from '../text';
import { PrimaryButton, TertiaryButton } from '../ui';
import { SiGithub, SiLinkedin, SiSessionize } from 'react-icons/si';
import { Mail, FileUser } from 'lucide-react';
import { AvatarGraphic } from '../media';

/** Site footer with copyright and secondary navigation. */
export default function Footer() {
  return (
    <footer
      className="mt-5 text-center text-neutral-900 sm:mt-8 md:mt-11 lg:mt-13 2xl:mt-16"
      id="contact"
    >
      <div className="footer-container">
        <div className="flex flex-row">
          <div className="hidden flex-2 flex-col items-start justify-between gap-y-4 px-2 lg:flex">
            <div className="mb-3 flex flex-row items-center justify-center gap-x-3">
              <AvatarGraphic className="border-brand-300 h-26 w-26 flex-shrink-0 rounded-full border-2" />
              <div>
                <SubHeading className="text-brand-600 dark:text-brand-300 text-start font-bold">
                  {en.footerSection.catchPhraseHeader}
                </SubHeading>
                <BodyText className="text-start">
                  {en.footerSection.catchPhraseSubheader}
                </BodyText>
              </div>
            </div>
            <BodyText className="text-center italic">
              {en.footerSection.catchPhraseSupportingTextPart1}
              <span className="font-semibold">
                {en.footerSection.catchPhraseSupportingTextPart2}
              </span>
            </BodyText>
          </div>
          <div className="footer-column lg:border-l-1">
            <PrimaryButton>
              <FileUser className="h-6 w-6" />
            </PrimaryButton>
            <PrimaryButton hyperlink="mailto:zahed.heidari2@gmail.com">
              <Mail className="h-6 w-6" />
            </PrimaryButton>
          </div>
          <div className="footer-column border-l-1">
            <TertiaryButton
              hyperlink="https://www.linkedin.com/in/zahed-heidari-56602b183/"
              target="_blank"
            >
              <SiLinkedin className="h-6 w-6" />
            </TertiaryButton>
            <TertiaryButton
              hyperlink="https://github.com/zahedh"
              target="_blank"
            >
              <SiGithub className="h-6 w-6" />
            </TertiaryButton>
            <TertiaryButton
              hyperlink="https://sessionize.com/zahedheidari/"
              target="_blank"
            >
              <SiSessionize className="h-6 w-6" />
            </TertiaryButton>
          </div>
        </div>
      </div>
      <BodyText className="mt-6 text-sm text-neutral-600">
        {en.footerSection.copyrightText}
      </BodyText>
    </footer>
  );
}
