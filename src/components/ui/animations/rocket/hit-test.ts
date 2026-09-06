import * as THREE from 'three';

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

/** Exact solid-mesh intersection. No rectangular proxy or expanded background hit area. */
export function createHitTest(
  camera: THREE.PerspectiveCamera,
  targets: THREE.Mesh[]
) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  return (
    clientX: number,
    clientY: number,
    rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>
  ): boolean => {
    if (rect.width <= 0 || rect.height <= 0) return false;
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return false;
    pointer.set(x * 2 - 1, 1 - y * 2);
    camera.updateMatrixWorld();
    targets.forEach((target) => target.updateWorldMatrix(true, false));
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(targets, false).some((hit) => {
      if (!visible(hit.object)) return false;
      const object = hit.object as THREE.Mesh;
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      const material = materials[hit.face?.materialIndex ?? 0] ?? materials[0];
      return material.visible && material.opacity > 0;
    });
  };
}
