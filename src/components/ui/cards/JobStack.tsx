'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { TechStack } from '@/components/ui/cards/TechStack';
import { skillsData } from '@/data/skills';
import { getSkillsByIds } from '@/lib/utils';
import { en } from '@/language';
import { measureContentHeight } from '@/hooks/utilityHooks';

/**
 * The stack a role used, shown beside its card where the rail has room.
 * Resolves the icons itself: they are component functions, so they cannot be
 * passed across the boundary from a server-rendered section.
 */
export function JobStack({
  skillIds,
  expanded = false,
}: {
  skillIds: string[];
  expanded?: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>();

  // Measured after each change so the reveal animates to a real height rather
  // than a guessed one, which is what lets the tiles keep their own wrapping.
  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const measure = () => setContentHeight(measureContentHeight(content));
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [expanded, skillIds]);

  return (
    <div className="experience-stack">
      <span className="experience-stack-label">{en.jobDisplay.stackLabel}</span>
      <div
        className="experience-stack-reveal"
        style={{ maxHeight: contentHeight ? `${contentHeight}px` : undefined }}
      >
        <div ref={contentRef}>
          <TechStack
            className="experience-stack-items"
            skills={getSkillsByIds(skillIds, skillsData)}
            maxItems={expanded ? undefined : 10}
            variant="labels"
          />
        </div>
      </div>
    </div>
  );
}

export default JobStack;
