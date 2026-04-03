'use client';
import { useTheme } from '@/hooks/utilityHooks';
import { en } from '@/language';
import { cn } from '@/lib/utils';
import { CalloutWrapper } from './CalloutWrapper';
import SecondaryButton from './SecondaryButton';
import { ThemeToggleGraphic } from '@/components/media';

/** Button that toggles between light and dark themes. */
export default function ThemeToggleButton() {
  const { toggleTheme } = useTheme();

  return (
    <CalloutWrapper showPing={false}>
      <SecondaryButton
        onClick={toggleTheme}
        className={cn('aspect-square px-3 py-1.5', 'btn-callout')}
        aria-label={en.themeToggle}
      >
        <ThemeToggleGraphic className="h-3.5 w-3.5" />
      </SecondaryButton>
    </CalloutWrapper>
  );
}
