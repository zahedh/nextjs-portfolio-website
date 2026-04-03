import { stripDescriptionLine } from '@/lib/projectDisplay';
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
    <ul className={cn('list-none space-y-3', className)}>
      {lines.map((raw, index) => (
        <li key={index} className="feature-list-item">
          <span className="feature-list-bullet" aria-hidden />
          <span>{stripDescriptionLine(raw)}</span>
        </li>
      ))}
    </ul>
  );
}
