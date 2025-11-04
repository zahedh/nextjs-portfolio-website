import BreakpointIndicator from '@/components/dev/BreakpointIndicator';
import HeaderFooter from '@/components/layout/HeaderFooter';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-100 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 dark:bg-neutral-900">
        <HeaderFooter>{children}</HeaderFooter>
        <BreakpointIndicator />
      </body>
    </html>
  );
}
