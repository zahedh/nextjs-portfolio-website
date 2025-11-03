'use client';
import { useEffect, useState } from 'react';

/** Handles light/dark theme switching and persistence */
export function useThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const nextTheme = isDark ? 'light' : 'dark';

    html.classList.toggle('dark');
    localStorage.setItem('theme', nextTheme);
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
}
