import * as THREE from 'three';
import { createHitTest, hitRadiusFor } from './hit-test';

/** A narrow upright sliver on the axis, standing in for a fin or the nozzle. */
function slimPart(): {
  camera: THREE.PerspectiveCamera;
  targets: THREE.Mesh[];
} {
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 1, 0.04),
    new THREE.MeshBasicMaterial()
  );
  mesh.updateWorldMatrix(true, false);
  return { camera, targets: [mesh] };
}

const RECT = { left: 0, top: 0, width: 346, height: 346 };
const CENTRE = RECT.width / 2;

describe('rocket hit test', () => {
  it('is exact for a mouse and forgiving for a touch', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);

    // Dead on hits either way.
    expect(hit(CENTRE, CENTRE, RECT, hitRadiusFor('mouse'))).toBe(true);
    expect(hit(CENTRE, CENTRE, RECT, hitRadiusFor('touch'))).toBe(true);

    // Eight pixels to the side of a sliver ~7px wide: a cursor misses, and
    // that is correct. A thumb landing there meant to hit it.
    const nearMiss = CENTRE + 8;
    expect(hit(nearMiss, CENTRE, RECT, hitRadiusFor('mouse'))).toBe(false);
    expect(hit(nearMiss, CENTRE, RECT, hitRadiusFor('touch'))).toBe(true);
  });

  it('does not forgive a pointer nowhere near the part', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);
    expect(hit(CENTRE + 120, CENTRE, RECT, hitRadiusFor('touch'))).toBe(false);
  });

  it('keeps the radius in screen pixels as the canvas scales', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);
    // The same 8px offset on the 2xl canvas is a smaller slice of the viewport,
    // so it must still land. A radius normalised by only one axis fails here.
    const wide = { left: 0, top: 0, width: 520, height: 520 };
    expect(hit(260 + 8, 260, wide, hitRadiusFor('touch'))).toBe(true);
  });

  it('rejects a pointer outside the canvas', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);
    expect(hit(-5, CENTRE, RECT, hitRadiusFor('touch'))).toBe(false);
  });
});
