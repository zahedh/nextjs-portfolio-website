/** Vertical gap (px) between tooltip bottom edge and tile top — matches translate calc. */
export const SKILL_TILE_TOOLTIP_GAP_PX = 8;

/**
 * Anchor point for a fixed tooltip above a tile: horizontal center, top edge of the tile.
 */
export function getSkillTileTooltipAnchor(
  element: HTMLElement | null
): { x: number; y: number } {
  if (!element) {
    return { x: 0, y: 0 };
  }
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top,
  };
}

/** CSS transform to center the tooltip horizontally and sit it above the anchor. */
export function getSkillTileTooltipTransform(): string {
  return `translate(-50%, calc(-100% - ${SKILL_TILE_TOOLTIP_GAP_PX}px))`;
}
