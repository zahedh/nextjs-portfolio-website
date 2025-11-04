'use client';
import { useThemeToggle } from '@/hooks/utilityHooks';

export default function ThemeToggleButton() {
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <button
      onClick={toggleTheme}
      className="text-brand-700 dark:text-brand-300 rounded-md bg-neutral-100 px-3 py-1.5 text-sm font-medium transition hover:opacity-80 dark:bg-neutral-800"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
