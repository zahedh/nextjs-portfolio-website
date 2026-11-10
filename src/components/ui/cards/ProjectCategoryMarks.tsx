import { Project, ProjectCategory } from '@/types/project';
import { cn } from '@/lib/utils';
import { Monitor, Smartphone, Sparkles, type LucideIcon } from 'lucide-react';

const CATEGORY_ICON: Record<ProjectCategory, LucideIcon> = {
  Web: Monitor,
  Mobile: Smartphone,
  AI: Sparkles,
};

/**
 * One category's glyph, for places that name a category rather than a project —
 * the filter controls, which double as the legend for the marks on the cards.
 */
export function CategoryMark({
  category,
  className,
}: {
  category: ProjectCategory;
  className?: string;
}) {
  const Icon = CATEGORY_ICON[category];
  return <Icon className={cn('category-mark', className)} strokeWidth={1.75} />;
}

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
      {project.categories.map((category) => (
        <CategoryMark
          key={category}
          category={category}
          className={markClassName}
        />
      ))}
    </span>
  );
}
