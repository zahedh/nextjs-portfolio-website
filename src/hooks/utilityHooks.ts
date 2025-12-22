'use client';
import { useEffect, useContext } from 'react';
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
