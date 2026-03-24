import { useCallback, useEffect, useRef } from 'react';

const DEFAULT_WINDOW_MS = 400;

export function useDoubleActivation(
  onDoubleActivate: (() => void) | undefined,
  enabled: boolean,
  windowMs = DEFAULT_WINDOW_MS
) {
  const countRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return useCallback(() => {
    if (!enabled || !onDoubleActivate) return;
    countRef.current += 1;
    if (countRef.current === 2) {
      onDoubleActivate();
      countRef.current = 0;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      countRef.current = 0;
      timerRef.current = null;
    }, windowMs);
  }, [enabled, onDoubleActivate, windowMs]);
}
