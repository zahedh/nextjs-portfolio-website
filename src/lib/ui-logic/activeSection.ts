export type SectionTop = { id: string; top: number };

/**
 * The section the reader is in: the one whose top has most recently crossed
 * `line` (a viewport y). Once the page has bottomed out, the last section on
 * the page wins even if it is too short for its top to reach the line.
 * Order-independent, so the nav can list sections in any order.
 */
export function pickActiveSection(
  sections: readonly SectionTop[],
  line: number,
  atBottom: boolean
): string | null {
  if (sections.length === 0) return null;
  if (atBottom) {
    return sections.reduce((last, s) => (s.top > last.top ? s : last)).id;
  }
  let current: SectionTop | null = null;
  for (const s of sections) {
    if (s.top <= line && (!current || s.top > current.top)) current = s;
  }
  return current?.id ?? null;
}
