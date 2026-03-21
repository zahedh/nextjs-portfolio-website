'use client';

import Image from 'next/image';
import LightModeAbout from '../../../public/images/lightModeAbout.png';
import DarkModeAbout from '../../../public/images/darkModeAbout.png';

type Props = {
  alt?: string;
  className?: string;
  sizes?: string;
};

/** Illustration used in the About section, switching with theme. */
export default function AboutGraphic({
  alt = 'About section illustration',
  sizes = '(max-width: 768px) 100vw, 800px',
  className,
}: Props) {
  return (
    <>
      <Image
        src={LightModeAbout}
        alt={alt}
        width={LightModeAbout.width}
        height={LightModeAbout.height}
        loading="eager"
        sizes={sizes}
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
        }}
        className={`dark:hidden h-auto ${className || ''}`}
      />
      <Image
        src={DarkModeAbout}
        alt={alt}
        width={DarkModeAbout.width}
        height={DarkModeAbout.height}
        loading="eager"
        sizes={sizes}
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
        }}
        className={`hidden h-auto dark:block ${className || ''}`}
      />
    </>
  );
}
