import BreakpointIndicator from '@/components/dev/BreakpointIndicator';
import HeaderFooter from '@/components/layout/HeaderFooter';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeaderFooter>{children}</HeaderFooter>
        <BreakpointIndicator />
      </body>
    </html>
  );
}
