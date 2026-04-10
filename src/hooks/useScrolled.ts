'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true once the user has scrolled past `threshold` pixels.
 * Initialises to false so SSR and first client render are identical.
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > threshold);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [threshold]);
  return scrolled;
}
