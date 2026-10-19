'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/utilityHooks';
import { en } from '@/language';
import { cn } from '@/lib/utils';

const OPTIONS = [
  { theme: 'light', Icon: Sun },
  { theme: 'dark', Icon: Moon },
] as const;

/**
 * Light/dark switch drawn as two options; a click anywhere on it swaps the
 * theme. The current theme carries the accent fill, styled from the `dark`
 * class on the root so it is right on first paint.
 */
export default function ThemeSwitch({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={en.themeToggle}
      className={cn('theme-switch group', className)}
    >
      {OPTIONS.map(({ theme, Icon }) => (
        <span
          key={theme}
          data-theme-option={theme}
          className="theme-switch-option"
          aria-hidden
        >
          <Icon className="size-3.5" strokeWidth={2} />
        </span>
      ))}
    </button>
  );
}
