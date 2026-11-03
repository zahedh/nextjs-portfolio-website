'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { pickActiveSection } from '@/lib/ui-logic';

/**
 * The id of the section the reader is in, from `ids`, or null when disabled
 * or before any section reaches the line 40% down the viewport.
 *
 * `pin(id)` holds the answer on a section the reader chose from the nav until
 * they move the page themselves. The pointer, wheel and keyboard release it,
 * not the scroll event, because the jump to the chosen section scrolls too.
 */
export function useActiveSection(
  ids: readonly string[],
  enabled: boolean
): [active: string | null, pin: (id: string) => void] {
  const [active, setActive] = useState<string | null>(null);
  const pinned = useRef<string | null>(null);
  const updateRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!enabled) {
      pinned.current = null;
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
        pickActiveSection(
          sections,
          window.innerHeight * 0.4,
          atBottom,
          pinned.current
        )
      );
    };
    // A nav click arrives as pointerdown or keydown first, so the old pin is
    // released before the click sets the new one.
    const release = () => {
      if (pinned.current === null) return;
      pinned.current = null;
      update();
    };
    updateRef.current = update;
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('wheel', release, { passive: true });
    window.addEventListener('pointerdown', release);
    window.addEventListener('keydown', release);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('wheel', release);
      window.removeEventListener('pointerdown', release);
      window.removeEventListener('keydown', release);
    };
  }, [ids, enabled]);

  const pin = useCallback((id: string) => {
    pinned.current = id;
    updateRef.current();
  }, []);

  return [active, pin];
}
