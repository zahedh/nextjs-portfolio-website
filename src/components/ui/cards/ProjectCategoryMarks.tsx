import { Project, ProjectCategory } from '@/types/project';
import { cn } from '@/lib/utils';
import { Monitor, Smartphone, Sparkles, type LucideIcon } from 'lucide-react';

const CATEGORY_ICON: Record<ProjectCategory, LucideIcon> = {
  Web: Monitor,
  Mobile: Smartphone,
  AI: Sparkles,
};

/**
 * The glyphs for every category a project spans. Hidden from the accessibility
 * tree: the card's own label already names the categories in words.
 */
export function ProjectCategoryMarks({
  project,
  className,
  markClassName,
}: {
  project: Project;
  className?: string;
  markClassName?: string;
}) {
  if (project.categories.length === 0) return null;

  return (
    <span className={cn('category-marks', className)} aria-hidden>
      {project.categories.map((category) => {
        const Icon = CATEGORY_ICON[category];
        return (
          <Icon
            key={category}
            className={cn('category-mark', markClassName)}
            strokeWidth={1.75}
          />
        );
      })}
    </span>
  );
}
