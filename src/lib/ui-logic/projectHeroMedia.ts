import { cn } from '@/lib/utils';

export function getProjectHeroRasterSizes(
  density: 'default' | 'compact'
): string {
  return density === 'compact'
    ? '(max-width: 768px) 100vw, 320px'
    : '(max-width: 768px) 100vw, 576px';
}

export function getProjectHeroFrameClassNames(
  density: 'default' | 'compact',
  frameClassName?: string
): string {
  return cn(
    'relative w-full overflow-hidden bg-neutral-100/85 dark:bg-neutral-800/55',
    density === 'compact'
      ? 'h-40 max-h-[min(200px,36vh)] sm:h-44'
      : 'h-36 sm:h-40 md:h-44',
    frameClassName
  );
}
