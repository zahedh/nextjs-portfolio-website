'use client';

import Image from 'next/image';
import LightModeToggle from '../../../public/images/lightModeToggle.png';
import DarkModeToggle from '../../../public/images/darkModeToggle.png';

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
          src={LightModeToggle}
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
          src={DarkModeToggle}
          alt={alt}
          fill
          sizes="14px"
          className="object-contain"
        />
      </div>
    </>
  );
}
