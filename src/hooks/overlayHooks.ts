'use client';

import { createEscapeHandler } from '@/lib/utils';
import { type RefObject, useEffect, useRef } from 'react';

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

/** Escape invokes `onClose` while `active` is true. */
export function useEscapeKeydown(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;

    const handleEscape = createEscapeHandler(onClose);
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [active, onClose]);
}

/**
 * Focuses the close control when the overlay opens; restores focus when it closes.
 * Pass `focusIdentity` when the overlay content identity changes while open (e.g. switching items).
 */
export function useFocusCloseButtonOnOpen(
  active: boolean,
  closeRef: RefObject<HTMLButtonElement | null>,
  focusIdentity?: unknown
) {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    const frameId = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(frameId);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [active, closeRef, focusIdentity]);
}
