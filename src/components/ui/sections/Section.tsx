import React from 'react';
import { cn } from '@/lib/utils';
import { Heading, SubHeading, BodyText } from '@/components/text';
import SectionDivider from './SectionDivider';

type SectionProps = {
  title?: string;
  titleAs?: 'h1' | 'h2';
  subheading?: string;
  align?: 'left' | 'center' | 'right';
  italicize?: boolean;
  /** Marks a section as one that earns a band, a step deeper than the ground. */
  banded?: boolean;
  showDivider?: boolean;
  showBottomDivider?: boolean;
  dividerWidth?: 'full' | 'half' | 'third';
  dividerColor?: string;
  className?: string;
  supportingText?: string;
  children?: React.ReactNode;
  anchor?: string;
  rightChildren?: React.ReactNode;
};

/** Generic layout section used to structure page content. */
export default function Section({
  title,
  titleAs = 'h2',
  subheading,
  align = 'left',
  italicize = false,
  banded = false,
  showDivider = false,
  showBottomDivider = false,
  dividerWidth = 'full',
  dividerColor,
  className,
  supportingText,
  children,
  anchor,
  rightChildren,
}: SectionProps) {
  return (
    <div
      id={anchor}
      className={cn('screen-section', banded && 'section-band', className)}
    >
      <div className="section-inner">
        {title && (
          <div className="section-heading-row">
            <Heading
              as={titleAs}
              className={cn(
                align === 'center' && 'text-center',
                align === 'right' && 'text-right',
                italicize && 'italic'
              )}
            >
              {title}
            </Heading>
            {rightChildren && (
              <div className="flex flex-shrink-0 flex-wrap gap-2">
                {rightChildren}
              </div>
            )}
          </div>
        )}

        {subheading && (
          <SubHeading
            className={cn(
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
            className={cn(
              'my-block lg:my-block-lg italic',
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
            className="mb-rhythm"
          />
        )}

        {children}

        {showBottomDivider && (
          <SectionDivider
            width={dividerWidth}
            align={align}
            color={dividerColor}
            className="mt-rhythm"
          />
        )}
      </div>
    </div>
  );
}
