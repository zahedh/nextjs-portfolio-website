'use client';
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useSyncExternalStore,
} from 'react';
import { flushSync } from 'react-dom';

function subscribeToThemeClass(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

const readIsDark = (): boolean =>
  document.documentElement.classList.contains('dark');

/**
 * The theme is the `dark` class on the root, which the pre-paint script in the
 * root layout sets from the stored choice. This reads that class and follows it;
 * the server renders dark, the default, and hydration corrects it.
 */
export function useTheme(): { isDark: boolean; toggleTheme: () => void } {
  const isDark = useSyncExternalStore(
    subscribeToThemeClass,
    readIsDark,
    () => true
  );

  const toggleTheme = useCallback(() => {
    const nextIsDark = !readIsDark();
    document.documentElement.classList.toggle('dark', nextIsDark);
    // Storage can throw in a private window; the switch still applies.
    try {
      localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    } catch {}
  }, []);

  return { isDark, toggleTheme };
}

/**
 * Height to open a collapsed panel to. `scrollHeight` is an integer, so content
 * measuring 75.25px reports 75 and the last row loses a quarter pixel behind
 * `overflow: hidden` — enough to shave the descenders off a wrapped row. The
 * rect keeps the fraction; the max of the two also covers the case where the
 * element scrolls its own content and the rect is the shorter of the two.
 */
export function measureContentHeight(element: HTMLElement): number {
  return Math.max(
    element.scrollHeight,
    Math.ceil(element.getBoundingClientRect().height)
  );
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
      const fullHeight = measureContentHeight(contentElement);
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
    flushSync(() => setContentHeight(measureContentHeight(content)));
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
