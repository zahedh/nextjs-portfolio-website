import * as THREE from 'three';
import type { RocketModel } from './model';
import type { RocketPhase, RocketTheme } from './types';

export const smooth = (value: number): number => {
  const x = Math.max(0, Math.min(1, value));
  return x * x * (3 - 2 * x);
};

export function createAnimation(
  model: RocketModel,
  onPhase: (phase: RocketPhase) => void
) {
  let phase: RocketPhase = 'idle';
  let elapsed = 0;
  let time = 0;
  let assemblyYaw = 0;
  const ignitionColour = new THREE.Color(0xfff1c9);

  function setPhase(next: RocketPhase) {
    if (next === 'assembling') assemblyYaw = model.rocket.rotation.y;
    phase = next;
    elapsed = 0;
    onPhase(next);
  }

  function activate(reducedMotion: boolean) {
    if (phase !== 'idle' && phase !== 'ready') return;
    setPhase(
      reducedMotion
        ? phase === 'idle'
          ? 'ready'
          : 'idle'
        : phase === 'idle'
          ? 'assembling'
          : 'ignition'
    );
  }

  function update(dt: number, theme: RocketTheme, reducedMotion: boolean) {
    if (!reducedMotion) {
      time += dt;
      elapsed += dt;
    }
    if (phase === 'assembling' && elapsed >= 1.35) setPhase('ready');
    if (phase === 'ignition' && elapsed >= 1.2) setPhase('flight');
    if (phase === 'flight' && elapsed >= 1.75) setPhase('returning');
    if (phase === 'returning' && elapsed >= 2.6) setPhase('settling');
    if (phase === 'settling' && elapsed >= 0.55) setPhase('separating');
    if (phase === 'separating' && elapsed >= 1.35) setPhase('idle');
    const spread =
      phase === 'idle'
        ? 1
        : phase === 'assembling'
          ? 1 - smooth(elapsed / 1.35)
          : phase === 'separating'
            ? smooth(elapsed / 1.35)
            : 0;
    model.parts.forEach((part, i) => {
      part.object.position
        .copy(part.target)
        .addScaledVector(part.offset, spread);
      if (!reducedMotion)
        part.object.position.y +=
          Math.sin(time * 1.2 + i * 0.8) * 0.035 * spread;
    });
    const upright =
      phase === 'ignition'
        ? smooth(elapsed / 1.2)
        : ['flight', 'returning'].includes(phase)
          ? 1
          : phase === 'settling'
            ? 1 - smooth(elapsed / 0.55)
            : 0;
    model.rocket.position.set(
      0,
      reducedMotion ? 0 : Math.sin(time * 0.9) * 0.045 * (1 - upright),
      0
    );
    const idleYaw =
      Math.sin((time * 2 * Math.PI) / 16) * THREE.MathUtils.degToRad(20);
    const yaw = reducedMotion
      ? 0
      : phase === 'idle'
        ? idleYaw
        : phase === 'assembling'
          ? assemblyYaw * (1 - smooth(elapsed / 1.35))
          : phase === 'separating'
            ? idleYaw * smooth(elapsed / 1.35)
            : 0;
    model.rocket.rotation.set(0.08 * (1 - upright), yaw, -0.19 * (1 - upright));
    let thrust = 0;
    if (phase === 'ignition') {
      model.rocket.position.x =
        Math.sin(time * 70) * 0.012 * Math.sin((Math.PI * elapsed) / 1.2);
      thrust = smooth(elapsed / 1.1);
    }
    // Apex, in world units. The rocket clears the top of the frame at about
    // 4.8, so the approved 9 left it parked out of sight for ~1.7s of a 4.35s
    // round trip. 7 shortens that dwell to ~1.3s while every phase keeps its
    // approved duration — it covers less distance in the same time rather than
    // travelling any faster.
    const apex = 7;
    if (phase === 'flight') {
      const d = Math.min(elapsed / 1.35, 1);
      model.rocket.position.y = d * d * apex;
      thrust = 1;
    }
    if (phase === 'returning') {
      model.rocket.position.y = apex * (1 - smooth(elapsed / 2.6));
      thrust = 0.35 * smooth(elapsed / 0.5) * (1 - smooth((elapsed - 2) / 0.6));
    }
    model.flame.visible = thrust > 0;
    const flicker =
      1 + Math.sin(time * 8) * 0.045 + Math.sin(time * 13.1) * 0.025;
    model.flame.scale.y = thrust * flicker;
    model.outer.material.uniforms.strength.value = 0.9 * thrust;
    model.inner.material.uniforms.strength.value = thrust;
    model.engineGlow.material.opacity =
      thrust * (theme === 'dark' ? 0.32 : 0.12);
    model.engineLight.intensity = thrust * (theme === 'dark' ? 1.6 : 0.8);
    model.sparks.forEach((spark, i) => {
      spark.visible = phase === 'ignition' || phase === 'flight';
      const age = (time * 1.5 + i / 28) % 1;
      spark.position.set(
        model.rocket.position.x + Math.sin(i * 7) * age * 0.45,
        model.rocket.position.y - 1.55 - age * 2.1,
        Math.cos(i * 4) * age * 0.3
      );
      spark.material.opacity = (1 - age) * 0.8 * thrust;
    });
    const windowAlpha = reducedMotion
      ? phase === 'ready'
        ? 1
        : 0
      : phase === 'ready'
        ? smooth(elapsed / 0.35)
        : phase === 'ignition'
          ? 1
          : phase === 'flight'
            ? 1 - smooth(elapsed / 0.2)
            : 0;
    const pulse =
      phase === 'ignition' ? Math.sin(Math.PI * Math.min(elapsed / 1.2, 1)) : 0;
    model.windowArrow.visible = windowAlpha > 0;
    model.arrowMaterial.opacity = windowAlpha;
    model.arrowMaterial.color
      .setHex(0xffb342)
      .lerp(ignitionColour, pulse * 0.85);
    model.glass.emissive.setHex(0xffa52c);
    model.glass.emissiveIntensity = pulse * 0.22;
  }

  return {
    activate,
    update,
    reset: () => {
      time = 0;
      setPhase('idle');
    },
    get phase() {
      return phase;
    },
  };
}
