'use client';

import Image, { ImageProps } from 'next/image';
import LightModeAvatar from '../../../public/images/lightModeAvatar.png';
import DarkModeAvatar from '../../../public/images/darkModeAvatar.png';

type Props = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

/** Avatar image used in the hero section (theme-aware placeholder). */
export default function AvatarGraphic({
  alt = 'Zahed avatar image',
  sizes = '(max-width: 768px) 100vw, 400px',
  className,
  ...rest
}: Props) {
  return (
    <>
      <Image
        src={LightModeAvatar}
        alt={alt}
        loading="lazy"
        sizes={sizes}
        className={`dark:hidden ${className || ''}`}
        {...rest}
      />
      <Image
        src={DarkModeAvatar}
        alt={alt}
        loading="lazy"
        sizes={sizes}
        className={`hidden dark:block ${className || ''}`}
        {...rest}
      />
    </>
  );
}
