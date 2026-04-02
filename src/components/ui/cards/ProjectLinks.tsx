import { en } from '@/language';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

const externalRel = 'noopener noreferrer';

export function ProjectLinks({
  url,
  fullWidth,
  className,
}: {
  url: string;
  fullWidth?: boolean;
  className?: string;
}) {
  const trimmed = url.trim();
  if (!trimmed) return null;

  return (
    <a
      href={trimmed}
      target="_blank"
      rel={externalRel}
      className={cn(
        'border-brand-500 bg-brand-300 text-neutral-900 hover:bg-brand-500 dark:text-neutral-200',
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold',
        'transition-colors duration-200',
        fullWidth && 'w-full',
        className
      )}
    >
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
      {en.projectDisplay.visitLive}
    </a>
  );
}
