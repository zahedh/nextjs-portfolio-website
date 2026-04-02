import { stripDescriptionLine } from '@/lib/projectDisplay';
import { cn } from '@/lib/utils';

export function FeatureList({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <ul className={cn('list-none space-y-3', className)}>
      {lines.map((raw, index) => (
        <li
          key={index}
          className="flex gap-3 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-400"
        >
          <span
            className="bg-brand-500 mt-2 h-1.5 w-1.5 shrink-0 rounded-full opacity-80"
            aria-hidden
          />
          <span>{stripDescriptionLine(raw)}</span>
        </li>
      ))}
    </ul>
  );
}
