'use client';

import { useEffect, useState } from 'react';
import { pickActiveSection } from '@/lib/ui-logic';

/**
 * The id of the section the reader is in, from `ids`, or null when disabled
 * or before any section reaches the line 40% down the viewport.
 */
export function useActiveSection(
  ids: readonly string[],
  enabled: boolean
): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const update = () => {
      const sections = ids.flatMap((id) => {
        const element = document.getElementById(id);
        return element
          ? [{ id, top: element.getBoundingClientRect().top }]
          : [];
      });
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      setActive(
        pickActiveSection(sections, window.innerHeight * 0.4, atBottom)
      );
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids, enabled]);

  return active;
}
