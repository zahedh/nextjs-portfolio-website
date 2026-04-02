'use client';

import Image from 'next/image';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';
import { Monitor, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ProjectHeroMedia({
  project,
  imagePriority = false,
  className,
  frameClassName,
}: {
  project: Project;
  imagePriority?: boolean;
  className?: string;
  /** Classes for the inner media frame (image / icon box) */
  frameClassName?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const ImageComponent = project.imageComponent;

  useEffect(() => {
    setImageError(false);
  }, [project.id]);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-200/30 dark:border-neutral-700/80 dark:bg-neutral-800/50',
        className
      )}
    >
      <div
        className={cn(
          'flex min-h-[200px] w-full items-center justify-center p-4 md:min-h-[240px]',
          frameClassName
        )}
      >
        {ImageComponent ? (
          <ImageComponent
            alt={`${project.title} preview`}
            className="h-44 w-44 shrink-0 rounded-xl object-cover shadow-md sm:h-52 sm:w-52"
          />
        ) : project.image && !imageError ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 400px"
            className="max-h-[min(280px,50vh)] max-w-full rounded-xl bg-neutral-100 object-contain p-1 shadow-md dark:bg-neutral-800"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            priority={imagePriority}
            fetchPriority={imagePriority ? 'high' : 'low'}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center">
            {project.projectType === 'Web' ? (
              <Monitor
                className="h-24 w-24 text-neutral-400 dark:text-neutral-600"
                strokeWidth={1.5}
              />
            ) : (
              <Smartphone
                className="h-24 w-24 text-neutral-400 dark:text-neutral-600"
                strokeWidth={1.5}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
