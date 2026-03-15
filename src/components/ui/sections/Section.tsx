import React from 'react';
import clsx from 'clsx';
import { Heading, SubHeading, BodyText } from '@/components/text';
import SectionDivider from './SectionDivider';

type SectionProps = {
  title?: string;
  subheading?: string;
  align?: 'left' | 'center' | 'right';
  italicize?: boolean;
  showDivider?: boolean;
  showBottomDivider?: boolean;
  dividerWidth?: 'full' | 'half' | 'third';
  dividerColor?: string;
  className?: string;
  supportingText?: string;
  children?: React.ReactNode;
  anchor?: string;
  filterButtons?: React.ReactNode;
};

/** Generic layout section used to structure page content. */
export default function Section({
  title,
  subheading,
  align = 'left',
  italicize = true,
  showDivider = true,
  showBottomDivider = false,
  dividerWidth = 'full',
  dividerColor,
  className,
  supportingText,
  children,
  anchor,
  filterButtons,
}: SectionProps) {
  return (
    <div id={anchor} className={clsx('screen-section', className)}>
      {title && (
        <div className="mb-2 flex w-full items-center justify-between gap-4">
          <Heading
            className={clsx(
              align === 'center' && 'text-center',
              align === 'right' && 'text-right',
              italicize && 'italic'
            )}
          >
            {title}
          </Heading>
          {filterButtons && (
            <div className="ml-auto flex flex-shrink-0 gap-2">
              {filterButtons}
            </div>
          )}
        </div>
      )}

      {subheading && (
        <SubHeading
          className={clsx(
            align === 'center' && 'text-center',
            align === 'right' && 'text-right',
            italicize && 'italic'
          )}
        >
          {subheading}
        </SubHeading>
      )}

      {supportingText && (
        <BodyText
          className={clsx(
            'my-6 sm:my-8 md:my-16 lg:my-24 italic',
            align === 'center' && 'text-center',
            align === 'right' && 'text-right'
          )}
        >
          {supportingText}
        </BodyText>
      )}

      {showDivider && (
        <SectionDivider
          width={dividerWidth}
          align={align}
          color={dividerColor}
          className="mb-5 sm:mb-8 md:mb-11 lg:mb-13 2xl:mb-16"
        />
      )}

      {children}

      {showBottomDivider && (
        <SectionDivider
          width={dividerWidth}
          align={align}
          color={dividerColor}
          className="mt-5 sm:mt-8 md:mt-11 lg:mt-13 2xl:mt-16"
        />
      )}
    </div>
  );
}
