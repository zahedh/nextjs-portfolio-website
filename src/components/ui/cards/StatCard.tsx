import { BodyText } from '@/components/text';

interface StatCardProps {
  value: string;
  label: string;
}

/** Card displaying a statistic. */
export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="border-brand-500/30 relative rounded-2xl border bg-neutral-100/80 px-5 py-3 shadow-lg backdrop-blur-sm xl:px-4 xl:py-2.5 2xl:px-6 2xl:py-4 dark:bg-neutral-800/80">
      <div className="text-center">
        <BodyText className="font-heading text-brand-500 dark:text-brand-400 text-3xl font-bold xl:text-2xl 2xl:text-3xl">
          {value}
        </BodyText>
        <BodyText className="text-xs font-semibold text-neutral-700 xl:text-[10px] 2xl:text-xs dark:text-neutral-300">
          {label}
        </BodyText>
      </div>
    </div>
  );
}
