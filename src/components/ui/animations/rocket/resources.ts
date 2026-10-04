import * as THREE from 'three';

/** Dispose shared geometry/material/texture references exactly once. */
export function disposeScene(scene: THREE.Scene): void {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  if (scene.environment) textures.add(scene.environment);
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
      if (object instanceof THREE.Mesh) geometries.add(object.geometry);
      const values = Array.isArray(object.material)
        ? object.material
        : [object.material];
      values.forEach((material) => {
        materials.add(material);
        Object.values(material).forEach((value) => {
          if (value instanceof THREE.Texture) textures.add(value);
        });
      });
    }
  });
  textures.forEach((texture) => texture.dispose());
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  scene.environment = null;
  scene.clear();
}
