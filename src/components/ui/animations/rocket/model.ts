import * as THREE from 'three';
import { disposeScene } from './resources';
export interface RocketPart {
  object: THREE.Object3D;
  target: THREE.Vector3;
  offset: THREE.Vector3;
}
// Geometry, shader and material constants extracted from the approved unmarked rocket.
export function createRocketModel() {
  const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  // The one deliberate departure from the handover's approved scene. It framed
  // the rocket at z 10.6, which left it filling 72% of the canvas height and 41%
  // of its width — a small object in a lot of air, once the hero gave it a real
  // slot. Pulling in to 8.4 fills about 85% of the height. The separated idle
  // pose is the tallest of them and still clears the top edge; yaw is about the
  // vertical axis, so it does not change that. Framing only: no geometry,
  // material, timing or pose constant is touched.
  //
  // x and y centre what is actually drawn. The separated idle pose does not sit
  // on the origin: sampled every two seconds across the 16s yaw, it held a mean
  // of 9.8px above and 15.4px left of the canvas centre at 340px, and never
  // crossed it in either axis. Over a 5.30-unit field that is 0.152 and 0.240
  // units, added to the camera so the rocket lines up with the hero copy beside
  // it. The remaining few pixels of sway are the yaw itself and are meant to be
  // there.
  camera.position.set(-0.24, 0.252, 8.4);
  const amber = new THREE.MeshPhysicalMaterial({
    color: 0xf6a009,
    metalness: 0.78,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });
  const edge = new THREE.MeshPhysicalMaterial({
    color: 0xffca52,
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 1,
  });
  const charcoal = new THREE.MeshStandardMaterial({
    color: 0x37332d,
    metalness: 0.35,
    roughness: 0.48,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x39200b,
    metalness: 0.65,
    roughness: 0.08,
    clearcoat: 1,
  });
  const key = new THREE.DirectionalLight(0xffeac5, 4);
  key.position.set(-4, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xff8100, 4);
  rim.position.set(3, 2, -3);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xfff5de, 0x713008, 2));
  // A studio reflection map keeps metallic surfaces legible in both themes.
  const envCanvas = document.createElement('canvas');
  envCanvas.width = 1024;
  envCanvas.height = 512;
  const ctx = envCanvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#c2ad87');
  grad.addColorStop(0.45, '#51422e');
  grad.addColorStop(0.52, '#16100b');
  grad.addColorStop(1, '#a75811');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);
  ctx.fillStyle = '#fff4dc';
  ctx.fillRect(180, 30, 90, 265);
  ctx.fillStyle = '#ffbe54';
  ctx.fillRect(640, 60, 160, 220);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(900, 80, 28, 250);
  const env = new THREE.CanvasTexture(envCanvas);
  env.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = env;
  const rocket = new THREE.Group();
  rocket.rotation.set(0.08, 0, -0.19);
  scene.add(rocket);
  const parts: RocketPart[] = [];
  function part(
    object: THREE.Object3D,
    pos: [number, number, number],
    offset: [number, number, number]
  ) {
    object.position.copy(new THREE.Vector3(...pos));
    rocket.add(object);
    parts.push({
      object,
      target: object.position.clone(),
      offset: new THREE.Vector3(...offset),
    });
    return object;
  }
  function lathe(points: [number, number][], mat: THREE.Material) {
    return new THREE.Mesh(
      new THREE.LatheGeometry(
        points.map((p) => new THREE.Vector2(...p)),
        64
      ),
      mat
    );
  }
  function torus(radius: number, tube: number, mat: THREE.Material) {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(radius, tube, 16, 80),
      mat
    );
    m.rotation.x = Math.PI / 2;
    return m;
  }
  const body = new THREE.Group();
  body.add(
    lathe(
      [
        [0, -0.95],
        [0.36, -0.95],
        [0.46, -0.8],
        [0.5, -0.4],
        [0.5, 0.64],
        [0.46, 0.88],
        [0.42, 0.95],
        [0, 0.95],
      ],
      amber
    )
  );
  const belt = torus(0.488, 0.027, charcoal);
  belt.position.y = -0.7;
  body.add(belt);
  // Raised porthole, facing the visitor.
  const windowRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.205, 0.046, 20, 64),
    edge
  );
  windowRim.position.set(0, 0.12, 0.49);
  body.add(windowRim);
  const windowPane = new THREE.Mesh(
    new THREE.SphereGeometry(0.177, 40, 24),
    glass
  );
  windowPane.scale.z = 0.3;
  windowPane.position.set(0, 0.12, 0.503);
  body.add(windowPane);
  // A small in-glass status glyph; it follows the porthole rather than the camera.
  const arrowShape = new THREE.Shape();
  arrowShape.moveTo(-0.018, -0.085);
  arrowShape.lineTo(0.018, -0.085);
  arrowShape.lineTo(0.018, 0.028);
  arrowShape.lineTo(0.057, -0.008);
  arrowShape.lineTo(0.077, 0.014);
  arrowShape.lineTo(0, 0.09);
  arrowShape.lineTo(-0.077, 0.014);
  arrowShape.lineTo(-0.057, -0.008);
  arrowShape.lineTo(-0.018, 0.028);
  arrowShape.closePath();
  const arrowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffb342,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    toneMapped: false,
  });
  const windowArrow = new THREE.Mesh(
    new THREE.ShapeGeometry(arrowShape),
    arrowMaterial
  );
  windowArrow.position.set(0, 0.12, 0.566);
  body.add(windowArrow);
  part(body, [0, 0.04, 0], [0, 0, 0]);
  // Lathe profiles run bottom-to-top so outward faces have outward normals.
  part(
    lathe(
      [
        [0, 0],
        [0.42, 0],
        [0.42, 0.06],
        [0.36, 0.28],
        [0.24, 0.58],
        [0.12, 0.85],
        [0.04, 1.02],
        [0, 1.06],
      ],
      amber
    ),
    [0, 1.01, 0],
    [0, 0.46, 0]
  );
  part(torus(0.425, 0.035, charcoal), [0, 0.995, 0], [0, 0.23, 0]);
  const engine = new THREE.Group();
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.25, 0.26, 64),
    charcoal
  );
  neck.position.y = -0.13;
  engine.add(neck);
  const bell = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.36, 0.25, 64),
    charcoal
  );
  bell.position.y = -0.375;
  engine.add(bell);
  part(engine, [0, -0.91, 0], [0, -0.34, 0]);
  const nozzle = new THREE.Group();
  nozzle.add(
    new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.09, 64), edge)
  );
  const aperture = new THREE.Mesh(
    new THREE.CylinderGeometry(0.275, 0.275, 0.012, 64),
    charcoal
  );
  aperture.position.y = -0.05;
  nozzle.add(aperture);
  part(nozzle, [0, -1.425, 0], [0, -0.5, 0]);
  // Two front-quarter fins and one rear fin, evenly spaced around the body.
  for (const angle of [-Math.PI / 6, (7 * Math.PI) / 6, Math.PI / 2]) {
    const shape = new THREE.Shape();
    shape.moveTo(0.505, -0.2);
    shape.bezierCurveTo(0.7, -0.4, 0.88, -0.95, 0.88, -1.28);
    shape.quadraticCurveTo(0.87, -1.36, 0.78, -1.32);
    shape.lineTo(0.4, -0.88);
    shape.lineTo(0.472, -0.76);
    shape.lineTo(0.505, -0.36);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.015,
      bevelThickness: 0.025,
      steps: 1,
    });
    g.translate(0, 0, -0.06);
    const fin = new THREE.Mesh(g, amber);
    fin.rotation.y = angle;
    part(
      fin,
      [0, 0, 0],
      [Math.cos(angle) * 0.38, -0.1, -Math.sin(angle) * 0.38]
    );
  }
  // Keep the simple tapered flame; soften the silhouette instead of adding smoke.
  function flameMaterial(core: boolean) {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { strength: { value: 0 }, core: { value: core ? 1 : 0 } },
      vertexShader: `varying vec2 vUv;varying vec3 vNormal;varying vec3 vView;void main(){vUv=uv;vec4 view=modelViewMatrix*vec4(position,1.0);vNormal=normalize(normalMatrix*normal);vView=-view.xyz;gl_Position=projectionMatrix*view;}`,
      fragmentShader: `varying vec2 vUv;varying vec3 vNormal;varying vec3 vView;uniform float strength;uniform float core;void main(){float facing=abs(dot(normalize(vNormal),normalize(vView)));float edge=smoothstep(0.0,0.55,facing);float tip=1.0-smoothstep(0.72,1.0,vUv.y);vec3 warm=mix(vec3(1.0,0.73,0.16),vec3(1.0,0.24,0.015),vUv.y);vec3 colour=mix(warm,vec3(1.0,0.94,0.68),core);gl_FragColor=vec4(colour,strength*edge*tip);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,
    });
  }
  const flame = new THREE.Group();
  rocket.add(flame);
  flame.position.y = -1.49;
  const outer = new THREE.Mesh(
    new THREE.ConeGeometry(0.235, 0.98, 40),
    flameMaterial(false)
  );
  outer.rotation.z = Math.PI;
  outer.position.y = -0.47;
  flame.add(outer);
  const inner = new THREE.Mesh(
    new THREE.ConeGeometry(0.115, 0.66, 40),
    flameMaterial(true)
  );
  inner.rotation.z = Math.PI;
  inner.position.set(0, -0.31, 0.035);
  flame.add(inner);
  flame.visible = false;
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 128;
  glowCanvas.height = 128;
  const glowContext = glowCanvas.getContext('2d')!;
  const glowGradient = glowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
  glowGradient.addColorStop(0, 'rgba(255,205,100,0.65)');
  glowGradient.addColorStop(0.3, 'rgba(255,142,20,0.25)');
  glowGradient.addColorStop(1, 'rgba(255,105,0,0)');
  glowContext.fillStyle = glowGradient;
  glowContext.fillRect(0, 0, 128, 128);
  const engineGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(glowCanvas),
      transparent: true,
      depthWrite: false,
      opacity: 0,
    })
  );
  engineGlow.position.set(0, -1.69, -0.12);
  engineGlow.scale.set(1.25, 1.25, 1);
  rocket.add(engineGlow);
  const engineLight = new THREE.PointLight(0xffa52c, 0, 2.3, 2);
  engineLight.position.set(0, -1.61, 0.12);
  rocket.add(engineLight);
  const sparks: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[] =
    [];
  for (let i = 0; i < 28; i++) {
    const s = new THREE.Mesh(
      new THREE.SphereGeometry(0.025 + (i % 3) * 0.012, 8, 8),
      new THREE.MeshBasicMaterial({
        color: i % 2 ? 0xffb523 : 0xffdf8a,
        transparent: true,
      })
    );
    scene.add(s);
    sparks.push(s);
  }

  const hitTargets: THREE.Mesh[] = [];
  parts.forEach(({ object }) =>
    object.traverse((o) => {
      if (o instanceof THREE.Mesh) hitTargets.push(o);
    })
  );
  return {
    scene,
    camera,
    rocket,
    parts,
    hitTargets,
    key,
    flame,
    outer,
    inner,
    engineGlow,
    engineLight,
    sparks,
    windowArrow,
    arrowMaterial,
    glass,
    dispose: () => disposeScene(scene),
  };
}
export type RocketModel = ReturnType<typeof createRocketModel>;
