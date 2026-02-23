import { en } from '@/language';
import { BodyText, SubHeading } from '../text';
import { PrimaryButton, TertiaryButton } from '../ui';
import { SiGithub, SiLinkedin, SiNotion } from 'react-icons/si';
import { Mail, Calendar } from 'lucide-react';
import { AvatarGraphic, InitialsGraphic } from '../media';

/** Site footer with copyright and secondary navigation. */
export default function Footer() {
  return (
    <footer className="text-center text-neutral-900">
      <div className="border-brand-300 bg-brand-300/5 flex w-full flex-col gap-8 overflow-hidden border-x-2 px-8 py-4 shadow-sm">
        <div className="flex flex-row">
          <div className="hidden flex-2 flex-col items-start justify-between md:flex">
            <div className="flex flex-row items-center justify-center gap-x-3">
              <AvatarGraphic className="border-brand-300 h-24 w-24 flex-shrink-0 rounded-full border-2" />
              <div>
                <SubHeading className="text-brand-600 dark:text-brand-300 text-start font-bold">
                  {en.footerSection.catchPhraseHeader}
                </SubHeading>
                <BodyText className="text-start">
                  {en.footerSection.catchPhraseSubheader}
                </BodyText>
              </div>
            </div>
            <BodyText className="mt-6 text-start font-semibold italic">
              {en.footerSection.catchPhraseSupportingText}
            </BodyText>
          </div>
          <div className="border-brand-300 flex flex-1 flex-col items-center justify-start gap-y-5 border-0 md:border-l-1">
            <SubHeading className="t-md font-semibold">
              {en.footerSection.contactHeader}
            </SubHeading>
            <PrimaryButton>
              <Mail size={20} />
              {en.footerSection.talkButtonLabel}
            </PrimaryButton>
            <PrimaryButton>
              <Calendar size={20} />
              {en.footerSection.meetButtonLabel}
            </PrimaryButton>
          </div>
          <div className="border-brand-300 flex flex-1 flex-col items-center justify-start gap-y-5 border-l-1">
            <SubHeading className="t-md font-semibold">
              {en.footerSection.connectHeader}
            </SubHeading>
            <TertiaryButton>
              <SiLinkedin size={20} />
            </TertiaryButton>
            <TertiaryButton>
              <SiGithub size={20} />
            </TertiaryButton>
            <TertiaryButton>
              <SiNotion size={20} />
            </TertiaryButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
