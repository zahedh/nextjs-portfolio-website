'use client';
import { useTheme } from '@/hooks/utilityHooks';
import SecondaryButton from './SecondaryButton';
import { ThemeToggleGraphic } from '@/components/media';

export default function ThemeToggleButton() {
  const { toggleTheme } = useTheme();

  return (
    <SecondaryButton onClick={toggleTheme} className="aspect-square p-1.5">
      <ThemeToggleGraphic className="h-3.5 w-3.5" />
    </SecondaryButton>
  );
}
