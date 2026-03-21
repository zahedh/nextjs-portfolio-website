'use client';

import Image from 'next/image';
import LightModeAvatar from '../../../public/images/lightModeAvatar.png';
import DarkModeAvatar from '../../../public/images/darkModeAvatar.png';

type Props = {
  alt?: string;
  /** Passed to the outer wrapper (e.g. `h-32 w-32 rounded-full`) */
  className?: string;
  /** Responsive sizes hint for `next/image` when using `fill` */
  sizes?: string;
  /** Set on the hero avatar so the visible image can be LCP (above the fold). */
  priority?: boolean;
};

/** Avatar image used in the hero section (theme-aware). Uses `fill` to avoid next/image aspect-ratio console warnings. */
export default function AvatarGraphic({
  alt = 'Zahed avatar image',
  className = '',
  sizes = '(max-width: 639px) 128px, (max-width: 1023px) 160px, 192px',
  priority = false,
}: Props) {
  return (
    <>
      <div
        className={`relative shrink-0 overflow-hidden dark:hidden ${className}`}
      >
        <Image
          src={LightModeAvatar}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
      <div
        className={`relative hidden shrink-0 overflow-hidden dark:block ${className}`}
      >
        <Image
          src={DarkModeAvatar}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
    </>
  );
}
