'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Set by a previous or next link as it is followed, and read once by the page
 * that arrives. A client-side navigation keeps this module alive, so nothing
 * needs to travel in the URL; a fresh load starts it false, which also keeps
 * the server and the client rendering the same markup.
 */
let arrivingByStep = false;

interface ProjectStepLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Links to a neighbouring project and asks its page to settle in. Only a plain
 * click asks: a modified click opens another tab and leaves this one where it
 * is, and the request would otherwise wait for whatever project opens next.
 */
export function ProjectStepLink({
  href,
  className,
  children,
}: ProjectStepLinkProps) {
  const markStep = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    arrivingByStep = true;
  };

  return (
    <Link href={href} className={className} onClick={markStep}>
      {children}
    </Link>
  );
}

/**
 * A project page's content, which settles in piece by piece when the reader
 * arrived from the previous or next link. Keyed by slug where it is used, so
 * each project mounts its own and reads the request afresh.
 */
export function ProjectPageStack({ children }: { children: React.ReactNode }) {
  const [settling] = useState(() => {
    const requested = arrivingByStep;
    arrivingByStep = false;
    return requested;
  });

  return (
    <div className={cn('page-stack', settling && 'project-settle')}>
      {children}
    </div>
  );
}
