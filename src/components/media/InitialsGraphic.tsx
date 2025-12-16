'use client';

import Image, { ImageProps } from 'next/image';
import { useTheme } from '@/hooks/utilityHooks';

import LightModeInitials from '../../../public/images/lightModeInitials.png';
import DarkModeInitials from '../../../public/images/darkModeInitials.png';

type Props = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

export default function InitialsGraphic({
  alt = 'Initials graphic',
  sizes = '(max-width: 768px) 100vw, 400px',
  ...rest
}: Props) {
  const { isDark } = useTheme();
  const src = isDark ? DarkModeInitials : LightModeInitials;

  return <Image src={src} alt={alt} loading="eager" sizes={sizes} {...rest} />;
}
