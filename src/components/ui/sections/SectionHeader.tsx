export default function SectionHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-brand-600 dark:text-brand-400 text-center text-2xl font-semibold">
      {children}
    </h2>
  );
}
