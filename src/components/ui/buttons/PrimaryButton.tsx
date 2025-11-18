export default function PrimaryButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`bg-brand-500 rounded-md px-6 py-3 text-white ${className}`}
    >
      {children}
    </button>
  );
}
