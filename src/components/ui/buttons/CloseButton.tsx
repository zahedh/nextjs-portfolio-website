'use client';

import { CloseGraphic } from '@/components/media';

type CloseButtonProps = {
  onClick: () => void;
};

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 rounded-full p-2 text-neutral-900 transition-colors hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700"
      aria-label="Close menu"
    >
      <CloseGraphic className="h-6 w-6" />
    </button>
  );
}
