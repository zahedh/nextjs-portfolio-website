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
  dividerWidth?: 'full' | 'half' | 'third';
  dividerColor?: string;
  className?: string;
  supportingText?: string;
  children?: React.ReactNode;
  anchor?: string;
};

export default function Section({
  title,
  subheading,
  align = 'left',
  italicize = true,
  showDivider = true,
  dividerWidth = 'full',
  dividerColor,
  className,
  supportingText,
  children,
  anchor,
}: SectionProps) {
  return (
    <div id={anchor} className={clsx('screen-section py-xs', className)}>
      {title && (
        <Heading
          className={clsx(
            align === 'center' && 'text-center',
            align === 'right' && 'text-right',
            italicize && 'italic'
          )}
        >
          {title}
        </Heading>
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
            'my-sm md:my-md lg:my-lg italic',
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
    </div>
  );
}
