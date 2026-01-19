'use client';
import { useEffect, useContext, useState, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  useGlobalStore,
  GlobalStoreContext,
} from '@/providers/global-store-provider';

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
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' && store) {
      document.documentElement.classList.add('dark');
      store.setState({ isDark: true });
    }
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

    // Initial check
    checkOverflow();

    // Watch for size changes with ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    resizeObserver.observe(contentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [maxHeight]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return {
    isExpanded,
    showExpandButton,
    contentHeight,
    contentRef,
    handleToggle,
  };
}
