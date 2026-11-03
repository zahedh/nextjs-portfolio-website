'use client';

import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Set by a previous or next link as it is followed, and read once by the page
 * that arrives. A client-side navigation keeps this module alive, so nothing
 * needs to travel in the URL; a fresh load starts it false, which also keeps
 * the server and the client rendering the same markup.
 */
let arrivingByStep = false;

/**
 * Set as a project page unmounts and cleared as one mounts, so it is true only
 * when the reader has left the projects for somewhere else, which is nearly
 * always back to them. Layout effects, because the page being left unmounts in
 * the same commit as the one arriving lays out, and a passive cleanup would
 * run after the arriving page had already looked.
 */
let leftProjectPage = false;

/** Whether the reader has just come back from a project page; reads once. */
export function consumeProjectReturn(): boolean {
  const returned = leftProjectPage;
  leftProjectPage = false;
  return returned;
}

/**
 * The Projects section's filter and expansion as a query string, kept by the
 * section whenever it settles them, so the way back from a project returns the
 * reader to the set they left, as the browser's Back already does. Empty on a
 * fresh load of a project page, where there is no set to return to.
 */
let projectsQuery = '';

export function rememberProjectsQuery(query: string): void {
  projectsQuery = query;
}

/** The project page's way back to the Projects section and its last set. */
export function ProjectBackLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={`/${projectsQuery}#projects`} className={className}>
      {children}
    </Link>
  );
}

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

  useLayoutEffect(() => {
    leftProjectPage = false;
    return () => {
      leftProjectPage = true;
    };
  }, []);

  return (
    <div className={cn('page-stack', settling && 'project-settle')}>
      {children}
    </div>
  );
}
