import { stripDescriptionLine } from '@/lib/ui-logic';
import { cn } from '@/lib/utils';

/** Bulleted list of project features / description lines. */
export function FeatureList({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        'text-body list-disc space-y-3 pl-5 text-neutral-700 marker:text-neutral-400 dark:text-neutral-300 dark:marker:text-neutral-600',
        className
      )}
    >
      {lines.map((raw, index) => (
        <li key={index}>{stripDescriptionLine(raw)}</li>
      ))}
    </ul>
  );
}
