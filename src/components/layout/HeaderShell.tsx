'use client';

import { cn } from '@/lib/utils';

/** Client wrapper for the sticky header. */
export default function HeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-neutral-100/95 dark:bg-neutral-900/95',
        'shadow-none'
      )}
    >
      {children}
    </header>
  );
}
