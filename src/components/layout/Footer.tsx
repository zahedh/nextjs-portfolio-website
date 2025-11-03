export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-2 border-t border-neutral-200 bg-neutral-100 py-6 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
      <p className="text-center text-sm">
        © {new Date().getFullYear()}{' '}
        <span className="text-brand-600 dark:text-brand-400 font-medium">
          Zahed Heidari
        </span>
        . All rights reserved.
      </p>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Built with{' '}
        <span className="text-brand-500 dark:text-brand-300 font-semibold">
          Next.js
        </span>{' '}
        &{' '}
        <span className="text-brand-500 dark:text-brand-300 font-semibold">
          Tailwind CSS
        </span>
        .
      </p>
    </footer>
  );
}
