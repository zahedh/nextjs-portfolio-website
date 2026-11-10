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
// Eight pixels beside a sliver about 7px wide: a cursor there missed, a thumb
// there meant to hit it.
const NEAR_MISS = CENTRE + 8;

describe('rocket hit test', () => {
  it('GIVEN a mouse dead on the part WHEN tested THEN it hits', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);

    expect(hit(CENTRE, CENTRE, RECT, hitRadiusFor('mouse'))).toBe(true);
  });

  it('GIVEN a touch dead on the part WHEN tested THEN it hits', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);

    expect(hit(CENTRE, CENTRE, RECT, hitRadiusFor('touch'))).toBe(true);
  });

  it('GIVEN a mouse just beside the part WHEN tested THEN it misses', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);

    expect(hit(NEAR_MISS, CENTRE, RECT, hitRadiusFor('mouse'))).toBe(false);
  });

  it('GIVEN a touch just beside the part WHEN tested THEN it is forgiven', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);

    expect(hit(NEAR_MISS, CENTRE, RECT, hitRadiusFor('touch'))).toBe(true);
  });

  it('GIVEN a touch nowhere near the part WHEN tested THEN it misses', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);

    expect(hit(CENTRE + 120, CENTRE, RECT, hitRadiusFor('touch'))).toBe(false);
  });

  it('GIVEN a larger canvas WHEN a touch lands just beside the part THEN the radius holds in screen pixels', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);
    // The same 8px is a smaller slice of the 2xl canvas; a radius normalised
    // by only one axis fails here.
    const wide = { left: 0, top: 0, width: 520, height: 520 };

    expect(hit(260 + 8, 260, wide, hitRadiusFor('touch'))).toBe(true);
  });

  it('GIVEN a pointer outside the canvas WHEN tested THEN it misses', () => {
    const { camera, targets } = slimPart();
    const hit = createHitTest(camera, targets);

    expect(hit(-5, CENTRE, RECT, hitRadiusFor('touch'))).toBe(false);
  });
});
