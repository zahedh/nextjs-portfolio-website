'use client';
import {
  useEffect,
  useContext,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import { flushSync } from 'react-dom';
import { useShallow } from 'zustand/react/shallow';
import {
  useGlobalStore,
  GlobalStoreContext,
} from '@/providers/global-store-provider';

/** Tailwind CSS breakpoint values (in pixels) */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/** Handles light/dark theme switching and persistence. */
export function useTheme() {
  const { isDark, toggleTheme } = useGlobalStore(
    useShallow((state) => ({
      isDark: state.isDark,
      toggleTheme: state.toggleTheme,
    }))
  );
  const store = useContext(GlobalStoreContext);

  useEffect(() => {
    if (!store) return;
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const shouldBeDark =
      storedTheme === 'dark' || (storedTheme !== 'light' && prefersDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    store.setState({ isDark: shouldBeDark });
  }, [store]);

  return { isDark, toggleTheme };
}

/** Manages expandable content with overflow detection and smooth transitions. */
export function useExpandableContent(maxHeight: number = 300) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const checkOverflow = () => {
      const fullHeight = contentElement.scrollHeight;
      setContentHeight(fullHeight);
      setShowExpandButton(fullHeight > maxHeight);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    resizeObserver.observe(contentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [maxHeight]);

  const handleToggle = useCallback(() => {
    const content = contentRef.current;
    if (!content) {
      setIsExpanded((prev) => !prev);
      return;
    }
    flushSync(() => setContentHeight(content.scrollHeight));
    if (isExpanded) {
      requestAnimationFrame(() => setIsExpanded(false));
    } else {
      setIsExpanded(true);
    }
  }, [isExpanded]);

  return {
    isExpanded,
    showExpandButton,
    contentHeight,
    contentRef,
    handleToggle,
  };
}

/**
 * Detects if the viewport matches or exceeds a given Tailwind breakpoint.
 * Initial state is always `false` so SSR and first client render match (avoids hydration mismatch).
 * Sync runs in `useLayoutEffect` so the correct mode applies before paint.
 */
export function useBreakpoint(breakpoint: Breakpoint) {
  const [matches, setMatches] = useState(false);

  useLayoutEffect(() => {
    const minWidthQuery = `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
    const mediaQueryList = window.matchMedia(minWidthQuery);
    const syncMatchesFromViewport = () => setMatches(mediaQueryList.matches);
    syncMatchesFromViewport();
    mediaQueryList.addEventListener('change', syncMatchesFromViewport);
    return () =>
      mediaQueryList.removeEventListener('change', syncMatchesFromViewport);
  }, [breakpoint]);

  return matches;
}
