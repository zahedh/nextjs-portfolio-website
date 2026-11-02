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
        'text-body list-disc space-y-3 pl-5 text-neutral-700 marker:text-neutral-400 dark:text-neutral-300 dark:marker:text-neutral-600',
        className
      )}
    >
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  );
}
