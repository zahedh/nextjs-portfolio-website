'use client';

import Image, { ImageProps } from 'next/image';
import LightModeInitials from '../../../public/images/lightModeInitials.png';
import DarkModeInitials from '../../../public/images/darkModeInitials.png';

type Props = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

/** Logo graphic showing initials, switching per theme. */
export default function InitialsGraphic({
  alt = 'Initials graphic',
  sizes = '(max-width: 768px) 100vw, 400px',
  className,
  ...rest
}: Props) {
  return (
    <>
      <Image
        src={LightModeInitials}
        alt={alt}
        loading="eager"
        sizes={sizes}
        className={`dark:hidden ${className || ''}`}
        {...rest}
      />
      <Image
        src={DarkModeInitials}
        alt={alt}
        loading="eager"
        sizes={sizes}
        className={`hidden dark:block ${className || ''}`}
        {...rest}
      />
    </>
  );
}
