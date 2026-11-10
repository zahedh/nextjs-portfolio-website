import { cn } from '@/lib/utils';

/** Bulleted list of description lines, for projects and the job rail. */
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
        'text-body text-fg-secondary list-disc space-y-3 pl-5 marker:text-neutral-400 dark:marker:text-neutral-600',
        className
      )}
    >
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  );
}
