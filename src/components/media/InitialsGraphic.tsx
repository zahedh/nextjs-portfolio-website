'use client';

import Image from 'next/image';
import LightModeInitials from '../../../public/images/lightModeInitials.png';
import DarkModeInitials from '../../../public/images/darkModeInitials.png';

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
      <div className={`relative shrink-0 overflow-hidden dark:hidden ${className}`}>
        <Image
          src={LightModeInitials}
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
          src={DarkModeInitials}
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
