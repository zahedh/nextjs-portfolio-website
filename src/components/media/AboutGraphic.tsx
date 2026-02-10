'use client';

import Image, { ImageProps } from 'next/image';
import { useTheme } from '@/hooks/utilityHooks';

import LightModeAbout from '../../../public/images/lightModeAbout.png';
import DarkModeAbout from '../../../public/images/darkModeAbout.png';

type Props = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

/** Illustration used in the About section, switching with theme. */
export default function AboutGraphic({
  alt = 'About section illustration',
  sizes = '(max-width: 768px) 100vw, 800px',
  ...rest
}: Props) {
  const { isDark } = useTheme();
  const src = isDark ? DarkModeAbout : LightModeAbout;

  return <Image src={src} alt={alt} loading="eager" sizes={sizes} {...rest} />;
}
