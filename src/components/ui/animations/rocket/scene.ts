import * as THREE from 'three';
import { createRocketModel } from './model';
import { createAnimation } from './animation';
import { createHitTest } from './hit-test';
import type {
  RocketController,
  RocketPhase,
  RocketStatus,
  RocketTheme,
} from './types';

interface SceneOptions {
  theme: RocketTheme;
  paused: boolean;
  onStatus(status: RocketStatus): void;
  onPhase(phase: RocketPhase): void;
  onReducedMotion(reduced: boolean): void;
}

export function mountRocket(
  host: HTMLDivElement,
  options: SceneOptions
): RocketController {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  let model: ReturnType<typeof createRocketModel>;
  try {
    model = createRocketModel();
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = media.matches;
  let theme = options.theme;
  let paused = options.paused;
  let disposed = false;
  let failed = false;
  let loaded = false;
  let visible = true;
  let raf: number | null = null;
  let last = performance.now();
  let down: { id: number; x: number; y: number } | null = null;
  const animation = createAnimation(model, (phase) => {
    options.onPhase(phase);
    if (phase !== 'idle' && phase !== 'ready') host.style.cursor = '';
  });
  const hitTest = createHitTest(model.camera, model.hitTargets);
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  renderer.setClearColor(0, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  host.appendChild(canvas);

  function stop() {
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
  }
  function active() {
    return !disposed && !failed && visible && !document.hidden;
  }
  function interactive() {
    return (
      active() &&
      loaded &&
      !paused &&
      (animation.phase === 'idle' || animation.phase === 'ready')
    );
  }
  function requestFrame() {
    if (active() && raf === null) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  function setTheme(next: RocketTheme) {
    theme = next;
    const dark = theme === 'dark';
    const dpr = window.devicePixelRatio || 1;
    renderer.setPixelRatio(
      dark ? Math.min(dpr, 2) : Math.min(3, Math.max(2, dpr * 1.5))
    );
    renderer.toneMappingExposure = dark ? 1.05 : 0.95;
    model.key.intensity = dark ? 4 : 3.2;
    requestFrame();
  }
  function resize() {
    if (disposed || failed) return;
    const width = host.clientWidth,
      height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    model.camera.aspect = width / height;
    model.camera.updateProjectionMatrix();
    setTheme(theme);
  }
  function frame(now: number) {
    raf = null;
    if (!active()) return;
    const dt = paused || reduced ? 0 : Math.min((now - last) / 1000, 0.04);
    last = now;
    try {
      animation.update(dt, theme, reduced);
      renderer.render(model.scene, model.camera);
      if (!loaded) {
        loaded = true;
        options.onStatus('ready');
      }
    } catch {
      failed = true;
      host.style.cursor = '';
      options.onStatus('error');
      return;
    }
    if (!paused && !reduced) raf = requestAnimationFrame(frame);
  }
  function activate() {
    if (!interactive()) return;
    animation.activate(reduced);
    requestFrame();
  }
  function isHit(event: PointerEvent) {
    return (
      interactive() &&
      hitTest(event.clientX, event.clientY, host.getBoundingClientRect())
    );
  }
  function pointerDown(event: PointerEvent) {
    down =
      event.isPrimary && event.button === 0 && isHit(event)
        ? { id: event.pointerId, x: event.clientX, y: event.clientY }
        : null;
  }
  function pointerUp(event: PointerEvent) {
    const start = down;
    down = null;
    if (
      start &&
      start.id === event.pointerId &&
      Math.hypot(event.clientX - start.x, event.clientY - start.y) <= 8 &&
      isHit(event)
    )
      activate();
  }
  function pointerMove(event: PointerEvent) {
    if (down && Math.hypot(event.clientX - down.x, event.clientY - down.y) > 8)
      down = null;
    if (event.pointerType === 'mouse')
      host.style.cursor = isHit(event) ? 'pointer' : '';
  }
  function cancelPointer() {
    down = null;
    host.style.cursor = '';
  }
  function keyDown(event: KeyboardEvent) {
    if (event.target !== host || (event.key !== 'Enter' && event.key !== ' '))
      return;
    event.preventDefault();
    if (!event.repeat) activate();
  }
  // Assistive technologies can dispatch a click without pointer events.
  function accessibleClick(event: MouseEvent) {
    if (event.detail === 0 && event.target === host) activate();
  }
  function visibilityChanged() {
    stop();
    requestFrame();
  }
  function preferenceChanged(event: MediaQueryListEvent) {
    reduced = event.matches;
    options.onReducedMotion(reduced);
    if (reduced) animation.reset();
    stop();
    requestFrame();
  }
  function contextLost(event: Event) {
    event.preventDefault();
    failed = true;
    stop();
    host.style.cursor = '';
    options.onStatus('error');
  }
  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? false;
    stop();
    requestFrame();
  });
  host.addEventListener('pointerdown', pointerDown);
  host.addEventListener('pointerup', pointerUp);
  host.addEventListener('pointermove', pointerMove);
  host.addEventListener('pointerleave', cancelPointer);
  host.addEventListener('pointercancel', cancelPointer);
  host.addEventListener('keydown', keyDown);
  host.addEventListener('click', accessibleClick);
  canvas.addEventListener('webglcontextlost', contextLost);
  document.addEventListener('visibilitychange', visibilityChanged);
  window.addEventListener('resize', resize);
  media.addEventListener('change', preferenceChanged);
  resizeObserver.observe(host);
  intersectionObserver.observe(host);
  options.onReducedMotion(reduced);
  resize();

  return {
    setTheme(next) {
      if (!disposed && !failed) setTheme(next);
    },
    setPaused(next) {
      if (disposed) return;
      paused = next;
      cancelPointer();
      stop();
      requestFrame();
    },
    activate,
    dispose() {
      if (disposed) return;
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      media.removeEventListener('change', preferenceChanged);
      host.removeEventListener('pointerdown', pointerDown);
      host.removeEventListener('pointerup', pointerUp);
      host.removeEventListener('pointermove', pointerMove);
      host.removeEventListener('pointerleave', cancelPointer);
      host.removeEventListener('pointercancel', cancelPointer);
      host.removeEventListener('keydown', keyDown);
      host.removeEventListener('click', accessibleClick);
      canvas.removeEventListener('webglcontextlost', contextLost);
      document.removeEventListener('visibilitychange', visibilityChanged);
      window.removeEventListener('resize', resize);
      model.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      host.style.cursor = '';
    },
  };
}
