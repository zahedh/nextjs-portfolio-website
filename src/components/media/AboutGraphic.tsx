'use client';

import Image, { ImageProps } from 'next/image';
import LightModeAbout from '../../../public/images/lightModeAbout.png';
import DarkModeAbout from '../../../public/images/darkModeAbout.png';

type Props = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

/** Illustration used in the About section, switching with theme. */
export default function AboutGraphic({
  alt = 'About section illustration',
  sizes = '(max-width: 768px) 100vw, 800px',
  className,
  ...rest
}: Props) {
  return (
    <>
      <Image
        src={LightModeAbout}
        alt={alt}
        loading="eager"
        sizes={sizes}
        className={`dark:hidden ${className || ''}`}
        {...rest}
      />
      <Image
        src={DarkModeAbout}
        alt={alt}
        loading="eager"
        sizes={sizes}
        className={`hidden dark:block ${className || ''}`}
        {...rest}
      />
    </>
  );
}
