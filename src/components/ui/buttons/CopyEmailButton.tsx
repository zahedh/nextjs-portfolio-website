'use client';

import { useEffect, useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { en } from '@/language';
import PrimaryButton from './PrimaryButton';

const CONFIRM_MS = 2000;

/** The contact address as a button that copies it, since a mailto opens
    nothing for visitors without a mail app. The confirmation floats above,
    so the parent must be positioned, and the row never reflows. */
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
      // Clipboard refused (permissions, insecure context): fall back to the mail app.
      window.location.href = `mailto:${en.footerSection.email}`;
    }
  };

  return (
    <>
      <PrimaryButton
        onClick={copy}
        aria-label={`${en.footerSection.copyLabel}, ${en.footerSection.email}`}
        className={className}
      >
        {copied ? (
          <Check aria-hidden className="size-4" />
        ) : (
          <Mail aria-hidden className="size-4" />
        )}
        {en.footerSection.email}
      </PrimaryButton>
      <span role="status" aria-live="polite" className="copy-confirm">
        {copied ? en.footerSection.copiedLabel : ''}
      </span>
    </>
  );
}
