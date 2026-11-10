import * as THREE from 'three';

/* A fingertip is not a point. The silhouette is the hit area — no proxy box, no
   expanded background — but a single exact ray made the fins and the engine
   nozzle, a few pixels wide at mobile size, effectively untappable. A touch
   samples a ring around the contact point as well as its centre, so landing
   near a thin part counts; a mouse stays exact, since a cursor really is a
   point and a forgiving pointer would light up over empty canvas. */
const TOUCH_RADIUS_PX = 12;

/** Centre, then a ring of eight. Diagonals included: the fins are diagonal. */
const RING: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [0.7071, 0.7071],
  [0.7071, -0.7071],
  [-0.7071, 0.7071],
  [-0.7071, -0.7071],
];

export function hitRadiusFor(pointerType: string): number {
  return pointerType === 'mouse' ? 0 : TOUCH_RADIUS_PX;
}

function visible(object: THREE.Object3D): boolean {
  for (
    let parent: THREE.Object3D | null = object;
    parent;
    parent = parent.parent
  ) {
    if (!parent.visible) return false;
  }
  return true;
}

export function createHitTest(
  camera: THREE.PerspectiveCamera,
  targets: THREE.Mesh[]
) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  return (
    clientX: number,
    clientY: number,
    rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
    radius = 0
  ): boolean => {
    if (rect.width <= 0 || rect.height <= 0) return false;
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return false;

    // Hoisted out of the sample loop: neither the camera nor the parts move
    // between samples of one pointer event.
    camera.updateMatrixWorld();
    targets.forEach((target) => target.updateWorldMatrix(true, false));

    const solid = (hit: THREE.Intersection): boolean => {
      if (!visible(hit.object)) return false;
      const object = hit.object as THREE.Mesh;
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      const material = materials[hit.face?.materialIndex ?? 0] ?? materials[0];
      return material.visible && material.opacity > 0;
    };

    // The ring is in CSS pixels, so it is normalised by the live rect rather
    // than baked in: the canvas is 346px on a phone and 520px at 2xl, and a
    // fingertip is the same size on both.
    const stepX = radius / rect.width;
    const stepY = radius / rect.height;

    return RING.some(([offsetX, offsetY], index) => {
      // Centre only when exact. Also the common case: it short-circuits.
      if (index > 0 && radius <= 0) return false;
      const sampleX = x + offsetX * stepX;
      const sampleY = y + offsetY * stepY;
      if (sampleX < 0 || sampleX > 1 || sampleY < 0 || sampleY > 1)
        return false;
      pointer.set(sampleX * 2 - 1, 1 - sampleY * 2);
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObjects(targets, false).some(solid);
    });
  };
}
