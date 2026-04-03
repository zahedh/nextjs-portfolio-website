'use client';

import Image from 'next/image';
import type { Project } from '@/data/projects';
import { AvatarGraphic } from '@/components/media';
import { cn } from '@/lib/utils';
import { Monitor, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';

const IMAGE_TOKEN_MAP: Record<
  string,
  React.ComponentType<{ alt?: string; className?: string }>
> = {
  avatar: AvatarGraphic,
};

/** Responsive hero media block for project cards — renders image, token component, or fallback icon. */
export function ProjectHeroMedia({
  project,
  imagePriority = false,
  density = 'default',
  className,
  frameClassName,
}: {
  project: Project;
  imagePriority?: boolean;
  density?: 'default' | 'compact';
  className?: string;
  frameClassName?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const ImageComponent = project.imageToken
    ? IMAGE_TOKEN_MAP[project.imageToken]
    : undefined;

  useEffect(() => {
    setImageError(false);
  }, [project.id]);

  const frame = cn(
    'relative w-full overflow-hidden bg-neutral-100/85 dark:bg-neutral-800/55',
    density === 'compact'
      ? 'h-40 max-h-[min(200px,36vh)] sm:h-44'
      : 'h-36 sm:h-40 md:h-44',
    frameClassName
  );

  const rasterSizes =
    density === 'compact'
      ? '(max-width: 768px) 100vw, 320px'
      : '(max-width: 768px) 100vw, 672px';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-200/30 dark:border-neutral-700/80 dark:bg-neutral-800/50',
        className
      )}
    >
      {ImageComponent ? (
        <div
          className={cn(frame, 'flex items-center justify-center p-4 sm:p-5')}
        >
          <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-xl shadow-sm sm:h-36 sm:w-36 md:h-40 md:w-40">
            <ImageComponent
              alt={`${project.title} preview`}
              className="h-full w-full rounded-xl"
            />
          </div>
        </div>
      ) : project.image && !imageError ? (
        <div
          className={cn(frame, 'flex items-center justify-center p-4 sm:p-5')}
        >
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            width={1200}
            height={675}
            sizes={rasterSizes}
            className="max-h-full max-w-full object-contain object-center"
            priority={imagePriority}
            fetchPriority={imagePriority ? 'high' : 'low'}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div
          className={cn(
            frame,
            'flex items-center justify-center',
            density === 'compact' ? 'min-h-[120px]' : ''
          )}
        >
          {project.projectType === 'Web' ? (
            <Monitor
              className="h-16 w-16 text-neutral-400 sm:h-20 sm:w-20 dark:text-neutral-600"
              strokeWidth={1.5}
            />
          ) : (
            <Smartphone
              className="h-16 w-16 text-neutral-400 sm:h-20 sm:w-20 dark:text-neutral-600"
              strokeWidth={1.5}
            />
          )}
        </div>
      )}
    </div>
  );
}
