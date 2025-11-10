import React from 'react';
import clsx from 'clsx';
import { Heading } from '@/components/text';
import SectionDivider from './SectionDivider';

type SectionHeaderProps = {
  title: string;
  align?: 'left' | 'center' | 'right';
  italicize?: boolean;
  showDivider?: boolean;
  dividerWidth?: 'full' | 'half' | 'third';
  dividerColor?: string;
  className?: string;
};

export default function SectionHeader({
  title,
  align = 'left',
  italicize = true,
  showDivider = true,
  dividerWidth = 'full',
  dividerColor,
  className,
}: SectionHeaderProps) {
  return (
    <div className={clsx('w-full', className)}>
      <Heading
        className={clsx(
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          italicize && 'italic'
        )}
      >
        {title}
      </Heading>

      {showDivider && (
        <SectionDivider
          width={dividerWidth}
          align={align}
          color={dividerColor}
        />
      )}
    </div>
  );
}
