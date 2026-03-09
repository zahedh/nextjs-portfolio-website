'use client';

import Image, { ImageProps } from 'next/image';
import LightModeToggle from '../../../public/images/lightModeToggle.png';
import DarkModeToggle from '../../../public/images/darkModeToggle.png';

type Props = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

export default function ThemeToggleGraphic({
  alt = 'Theme toggle illustration',
  sizes = '(max-width: 768px) 100vw, 800px',
  className,
  ...rest
}: Props) {
  return (
    <>
      <Image
        src={LightModeToggle}
        alt={alt}
        loading="eager"
        sizes={sizes}
        className={`dark:hidden ${className || ''}`}
        {...rest}
      />
      <Image
        src={DarkModeToggle}
        alt={alt}
        loading="eager"
        sizes={sizes}
        className={`hidden dark:block ${className || ''}`}
        {...rest}
      />
    </>
  );
}
