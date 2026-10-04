'use client';

import { useEffect, useRef, useState } from 'react';
import type {
  RocketController,
  RocketPhase,
  RocketStatus,
  RocketTheme,
} from './types';
import styles from './Rocket.module.css';

export interface RocketProps {
  /** Resolved by the website. No Zustand, localStorage or document theme dependencies. */
  theme: RocketTheme;
  className?: string;
  /** Use the website's animation preference or a nearby pause control. */
  paused?: boolean;
}

export function Rocket({ theme, className = '', paused = false }: RocketProps) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<RocketController | null>(null);
  const latest = useRef({ theme, paused });
  const [status, setStatus] = useState<RocketStatus>('loading');
  const [phase, setPhase] = useState<RocketPhase>('idle');
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    latest.current = { theme, paused };
    controller.current?.setTheme(theme);
    controller.current?.setPaused(paused);
  }, [theme, paused]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let instance: RocketController | null = null;
    setStatus('loading');
    setPhase('idle');
    // Browser-only import: the initial Next.js render contains no canvas or Three.js work.
    void import('./scene')
      .then(({ mountRocket }) => {
        if (cancelled) return;
        instance = mountRocket(element, {
          ...latest.current,
          onStatus: (value) => {
            if (!cancelled) setStatus(value);
          },
          onPhase: (value) => {
            if (!cancelled) setPhase(value);
          },
          onReducedMotion: (value) => {
            if (!cancelled) setReduced(value);
          },
        });
        controller.current = instance;
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
      instance?.dispose();
      if (controller.current === instance) controller.current = null;
    };
  }, []);

  const busy = phase !== 'idle' && phase !== 'ready';
  const label =
    status === 'loading'
      ? 'Loading rocket'
      : status === 'error'
        ? 'Rocket preview unavailable'
        : paused
          ? 'Rocket animation paused'
          : phase === 'idle'
            ? 'Assemble rocket'
            : phase === 'ready'
              ? reduced
                ? 'Separate rocket'
                : 'Launch rocket'
              : 'Rocket animation in progress';

  return (
    <div className={`${styles.root} ${className}`} data-theme={theme}>
      <div className={styles.halo} aria-hidden="true" />
      <div
        ref={host}
        className={styles.scene}
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-disabled={status !== 'ready' || busy || paused}
        aria-busy={status === 'loading'}
        data-loaded={status === 'ready'}
      />
      {status === 'error' && (
        <span className={styles.fallback}>3D preview unavailable</span>
      )}
      <span className={styles.srOnly} role="status" aria-live="polite">
        {status === 'error'
          ? 'The rocket could not be displayed.'
          : phase === 'ready'
            ? reduced
              ? 'Rocket assembled. Activate to separate.'
              : 'Rocket assembled. Activate to launch.'
            : phase === 'flight'
              ? 'Rocket launched.'
              : ''}
      </span>
    </div>
  );
}
