'use client';

import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';

/**
 * Client wrapper for the sticky header. A hairline appears once the page has
 * scrolled, so content passing under the bar has an edge to pass under.
 */
export default function HeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const isScrolled = useScrolled(0);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-neutral-100/95 transition-shadow duration-150 dark:bg-neutral-900/95',
        isScrolled
          ? 'shadow-[0_1px_0_var(--color-neutral-200)] dark:shadow-[0_1px_0_var(--color-neutral-800)]'
          : 'shadow-none'
      )}
    >
      <div className="prime-parent">{children}</div>
    </header>
  );
}
