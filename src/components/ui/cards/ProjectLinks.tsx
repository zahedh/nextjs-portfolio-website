'use client';

import { CalloutWrapper } from '@/components';
import { en } from '@/language';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

/** External link button to a project's live site. */
export function ProjectLinks({
  url,
  fullWidth,
  className,
}: {
  url: string;
  fullWidth?: boolean;
  className?: string;
}) {
  const trimmed = url.trim();
  if (!trimmed) return null;

  return (
    <CalloutWrapper className={fullWidth ? 'block w-full' : undefined}>
      <a
        href={trimmed}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'btn-brand-link btn-callout min-h-12 px-5 py-3',
          fullWidth && 'w-full',
          className
        )}
      >
        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
        {en.projectDisplay.visitLive}
      </a>
    </CalloutWrapper>
  );
}
