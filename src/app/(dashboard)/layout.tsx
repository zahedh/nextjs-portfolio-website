import BreakpointIndicator from '@/components/dev/BreakpointIndicator';
import HeaderFooter from '@/components/layout/HeaderFooter';

/** Layout for dashboard routes, adding header, footer, and breakpoint indicator. */
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
