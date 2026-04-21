'use client';

import { CalloutWrapper } from '@/components';
import { en } from '@/language';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import type { ProjectLinkItem } from '@/types/project';

export type { ProjectLinkItem } from '@/types/project';

/** External link buttons for a project's live site/repo. */
export function ProjectLinks({
  links,
  fullWidth,
  className,
}: {
  links: ProjectLinkItem[];
  fullWidth?: boolean;
  className?: string;
}) {
  const normalizedLinks = links
    .map((link) => ({
      url: link.url.trim(),
      label: link.label?.trim() || en.projectDisplay.visitLive,
    }))
    .filter((link) => Boolean(link.url));

  if (normalizedLinks.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-4', fullWidth && 'w-full')}>
      {normalizedLinks.map((link) => (
        <CalloutWrapper
          key={`${link.url}-${link.label}`}
          className={fullWidth ? 'block w-full' : undefined}
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'btn-brand-link btn-callout min-h-12 px-5 py-3',
              fullWidth && 'w-full',
              className
            )}
          >
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            {link.label}
          </a>
        </CalloutWrapper>
      ))}
    </div>
  );
}
