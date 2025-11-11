'use client';

import Image, { ImageProps } from 'next/image';
import { useTheme } from '@/hooks/utilityHooks';

import LightModeAvatar from '../../../public/images/lightModeAvatar.webp';
import DarkModeAvatar from '../../../public/images/darkModeAvatar.webp';

type Props = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

export default function AvatarGraphic({
  alt = 'Zahed avatar image',
  sizes = '(max-width: 768px) 100vw, 400px',
  ...rest
}: Props) {
  const { isDark } = useTheme();
  const src = isDark ? DarkModeAvatar : LightModeAvatar;

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
