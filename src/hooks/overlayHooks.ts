'use client';

import { useEffect } from 'react';

/** Locks document scroll and compensates for the missing scrollbar width while active. */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) {
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'stable';

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.scrollbarGutter = '';
    };
  }, [active]);
}
