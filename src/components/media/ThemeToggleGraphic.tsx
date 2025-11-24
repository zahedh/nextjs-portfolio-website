'use client';

import Image, { ImageProps } from 'next/image';
import { useTheme } from '@/hooks/utilityHooks';

import LightModeToggle from '../../../public/images/lightModeToggle.png';
import DarkModeToggle from '../../../public/images/darkModeToggle.png';

type Props = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

export default function ThemeToggleGraphic({
  alt = 'Theme toggle illustration',
  sizes = '(max-width: 768px) 100vw, 800px',
  ...rest
}: Props) {
  const { isDark } = useTheme();
  const src = isDark ? DarkModeToggle : LightModeToggle;

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
