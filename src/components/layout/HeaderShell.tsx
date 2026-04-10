'use client';

import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';

/** Client wrapper that adds a scroll-aware separator shadow to the sticky header. */
export default function HeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrolled = useScrolled(8);
  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-neutral-100/95 dark:bg-neutral-900/95',
        'transition-shadow duration-200',
        scrolled ? 'header-divider' : 'shadow-none'
      )}
    >
      {children}
    </header>
  );
}
