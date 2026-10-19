'use client';

import Image from 'next/image';
import { themeToggleDark, themeToggleLight } from '@/images';

type Props = {
  alt?: string;
  className?: string;
};

export default function ThemeToggleGraphic({
  alt = 'Theme toggle illustration',
  className = '',
}: Props) {
  return (
    <>
      <div
        className={`relative shrink-0 overflow-hidden dark:hidden ${className}`}
      >
        <Image
          src={themeToggleLight}
          alt={alt}
          fill
          sizes="14px"
          className="object-contain"
        />
      </div>
      <div
        className={`relative hidden shrink-0 overflow-hidden dark:block ${className}`}
      >
        <Image
          src={themeToggleDark}
          alt={alt}
          fill
          sizes="14px"
          className="object-contain"
        />
      </div>
    </>
  );
}
