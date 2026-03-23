'use client';
import { useTheme } from '@/hooks/utilityHooks';
import { en } from '@/language';
import SecondaryButton from './SecondaryButton';
import { ThemeToggleGraphic } from '@/components/media';

/** Button that toggles between light and dark themes. */
export default function ThemeToggleButton() {
  const { toggleTheme } = useTheme();

  return (
    <SecondaryButton
      onClick={toggleTheme}
      className="aspect-square p-1.5"
      aria-label={en.themeToggle}
    >
      <ThemeToggleGraphic className="h-3.5 w-3.5" />
    </SecondaryButton>
  );
}
