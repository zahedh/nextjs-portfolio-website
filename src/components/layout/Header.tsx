'use client';
import { useThemeToggle } from '@/hooks/utilityHooks';

export default function Header() {
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <header className="bg-brand-500 dark:bg-brand-700 flex items-center justify-between px-6 py-4 text-neutral-100">
      <h1 className="text-xl font-semibold tracking-wide">
        Zahed Heidari Portfolio
      </h1>

      <button
        onClick={toggleTheme}
        className="text-brand-700 dark:text-brand-300 rounded-md bg-neutral-100 px-3 py-1.5 text-sm font-medium transition hover:opacity-80 dark:bg-neutral-800"
      >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );
}
