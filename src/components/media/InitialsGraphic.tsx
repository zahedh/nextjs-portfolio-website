'use client';

import Image, { ImageProps } from 'next/image';
import { useTheme } from '@/hooks/utilityHooks';

import LightModeInitials from '../../../public/images/lightModeInitials.webp';
import DarkModeInitials from '../../../public/images/darkModeInitials.webp';

type Props = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

export default function InitialsGraphic({
  alt = 'Initials graphic',
  sizes = '(max-width: 768px) 100vw, 400px',
  ...rest
}: Props) {
  const { isDark } = useTheme();
  const src = isDark ? DarkModeInitials : LightModeInitials;

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
