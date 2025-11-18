'use client';

export default function BreakpointIndicator() {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="bg-brand-600 sm:bg-brand-500 md:bg-brand-400 lg:bg-brand-300 xl:bg-brand-200 2xl:bg-brand-100 fixed right-3 bottom-3 z-50 rounded-md px-3 py-1 text-xs font-semibold text-neutral-900 shadow-lg transition-colors">
      {/* Breakpoint labels (only one visible per range) */}
      <span className="block sm:hidden">xs (&lt;640px)</span>
      <span className="hidden sm:block md:hidden">sm (≥640px)</span>
      <span className="hidden md:block lg:hidden">md (≥768px)</span>
      <span className="hidden lg:block xl:hidden">lg (≥1024px)</span>
      <span className="hidden xl:block 2xl:hidden">xl (≥1280px)</span>
      <span className="hidden 2xl:block">2xl (≥1536px)</span>
    </div>
  );
}
