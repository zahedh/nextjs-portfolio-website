import React from 'react';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/text';

type SectionProps = {
  title?: string;
  /** A band, a step deeper than the ground, for a section with no heading of
      its own: a heading already marks where a chapter starts. */
  banded?: boolean;
  className?: string;
  children?: React.ReactNode;
  anchor?: string;
  rightChildren?: React.ReactNode;
};

/** Generic layout section used to structure page content. */
export function Section({
  title,
  banded = false,
  className,
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
            <Heading as="h2">{title}</Heading>
            {rightChildren && (
              <div className="flex shrink-0 flex-wrap gap-2">
                {rightChildren}
              </div>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
