'use client';

import Image from 'next/image';
import { initialsDark, initialsLight } from '@/images';

type Props = {
  alt?: string;
  className?: string;
  sizes?: string;
};

/** Logo graphic showing initials, switching per theme. Uses `fill` to avoid next/image aspect-ratio warnings. */
export default function InitialsGraphic({
  alt = 'Initials graphic',
  className = '',
  sizes = '(max-width: 768px) 80px, 128px',
}: Props) {
  return (
    <>
      <div
        className={`relative shrink-0 overflow-hidden dark:hidden ${className}`}
      >
        <Image
          src={initialsLight}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain"
          loading="eager"
          priority
        />
      </div>
      <div
        className={`relative hidden shrink-0 overflow-hidden dark:block ${className}`}
      >
        <Image
          src={initialsDark}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain"
          loading="eager"
          priority
        />
      </div>
    </>
  );
}
