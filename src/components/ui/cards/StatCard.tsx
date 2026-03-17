import { BodyText } from '@/components/text';

interface StatCardProps {
  value: string;
  label: string;
}

/** Card displaying a statistic. */
export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="text-center">
        <BodyText className="stat-card-value">{value}</BodyText>
        <BodyText className="stat-card-label">{label}</BodyText>
      </div>
    </div>
  );
}
