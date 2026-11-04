'use client';

import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';

/**
 * Client wrapper for the sticky header. A hairline appears once the page has
 * scrolled, so content passing under the bar has an edge to pass under.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const isScrolled = useScrolled(0);

  return (
    <header
      className={cn(
        'bg-page/95 sticky top-0 z-50 transition-shadow duration-150',
        isScrolled
          ? 'shadow-[0_1px_0_var(--color-neutral-200)] dark:shadow-[0_1px_0_var(--color-neutral-800)]'
          : 'shadow-none'
      )}
    >
      <div className="prime-parent">{children}</div>
    </header>
  );
}
