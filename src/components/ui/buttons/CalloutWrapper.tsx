'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type CalloutWrapperProps = {
  children: ReactNode;
  /** When false, only the positioning wrapper is rendered (no ping). */
  showPing?: boolean;
  /** Override wrapper layout (e.g. `block w-full` for full-width controls). */
  className?: string;
};

/** Wraps a call-to-action control with optional ping decorations; pair with `btn-callout` on the child. */
export function CalloutWrapper({
  children,
  showPing = true,
  className,
}: CalloutWrapperProps) {
  return (
    <div className={cn('relative shrink-0', className ?? 'inline-flex')}>
      {showPing ? (
        <span className="btn-callout-ping-anchor" aria-hidden>
          <span className="btn-callout-ping-ring" />
          <span className="btn-callout-ping-core" />
        </span>
      ) : null}
      {children}
    </div>
  );
}
