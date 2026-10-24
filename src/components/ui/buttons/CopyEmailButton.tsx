'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { en } from '@/language';
import TertiaryButton from './TertiaryButton';

const CONFIRM_MS = 2000;

/** Copies the contact address, for visitors whose mailto opens no mail app.
    The confirmation floats above the button so the row never reflows. */
export default function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), CONFIRM_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(en.footerSection.email);
      setCopied(true);
    } catch {
      // Clipboard refused (permissions, insecure context): the mailto beside it still works.
    }
  };

  return (
    <span className="relative inline-flex shrink-0">
      <TertiaryButton
        onClick={copy}
        iconOnly
        aria-label={en.footerSection.copyLabel}
        className={className}
        icon={
          copied ? (
            <Check aria-hidden className="size-4" />
          ) : (
            <Copy aria-hidden className="size-4" />
          )
        }
      />
      <span role="status" aria-live="polite" className="copy-confirm">
        {copied ? en.footerSection.copiedLabel : ''}
      </span>
    </span>
  );
}
