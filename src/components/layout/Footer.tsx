import { en } from '@/language';
import { BodyText, SubHeading } from '../text';
import { PrimaryButton, TertiaryButton } from '../ui';
import { SiGithub, SiLinkedin, SiSessionize } from 'react-icons/si';
import { Mail } from 'lucide-react';
import { AvatarGraphic } from '../media';

/** Site footer with copyright and secondary navigation. */
export default function Footer() {
  return (
    <footer className="text-center text-neutral-900" id="contact">
      <div className="border-brand-300 bg-brand-300/5 hover:bg-brand-600/10 flex w-full flex-col gap-8 overflow-hidden border-x-2 p-8 shadow-sm transition-colors duration-150">
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
              {en.footerSection.catchPhraseSupportingText}
            </BodyText>
          </div>
          <div className="border-brand-300/60 flex flex-1 flex-col items-center justify-start gap-y-5 border-0 lg:border-l-1">
            <PrimaryButton hyperlink="mailto:zahed.heidari2@gmail.com">
              <Mail className="h-6 w-6" />
            </PrimaryButton>
          </div>
          <div className="border-brand-300/60 flex flex-1 flex-col items-center justify-start gap-y-5 border-l-1">
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
    </footer>
  );
}
