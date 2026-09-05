'use client';

import { ExternalLink } from 'lucide-react';
import { PrimaryButton, TertiaryButton } from '@/components/ui/buttons';
import { en } from '@/language';
import { cn } from '@/lib/utils';
import { ProjectLinkItem } from '@/types/project';

/**
 * A project's external links as the site's own actions: the first one is the
 * page's primary call, the rest sit beside it. The same pairing the hero and
 * the footer use, so a project page has no button of its own invention.
 */
export function ProjectLinks({
  links,
  className,
}: {
  links: ProjectLinkItem[];
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
    <div className={cn('project-page-actions', className)}>
      {normalizedLinks.map((link, index) => {
        const key = `${link.url}-${link.label}`;
        // Trailing: the icon says where the link goes, not what it is.
        const content = (
          <>
            {link.label}
            <ExternalLink aria-hidden className="size-4 shrink-0" />
          </>
        );

        return index === 0 ? (
          <PrimaryButton
            key={key}
            hyperlink={link.url}
            target="_blank"
            className="project-page-action"
          >
            {content}
          </PrimaryButton>
        ) : (
          <TertiaryButton
            key={key}
            hyperlink={link.url}
            target="_blank"
            className="project-page-action"
          >
            {content}
          </TertiaryButton>
        );
      })}
    </div>
  );
}
