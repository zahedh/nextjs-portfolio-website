'use client';

import Image, { ImageProps } from 'next/image';
import { useTheme } from '@/hooks/utilityHooks';

import LightModeAbout from '../../../public/images/lightModeAbout.webp';
import DarkModeAbout from '../../../public/images/darkModeAbout.webp';

type Props = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

export default function AboutGraphic({
  alt = 'About section illustration',
  sizes = '(max-width: 768px) 100vw, 800px',
  ...rest
}: Props) {
  const { isDark } = useTheme();
  const src = isDark ? DarkModeAbout : LightModeAbout;

  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      loading="lazy"
      sizes={sizes}
      {...rest}
    />
  );
}
