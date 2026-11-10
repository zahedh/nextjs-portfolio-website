import { Navbar } from '@/components/ui';
import { HeaderShell } from './HeaderShell';

/** Site header containing the primary navigation bar. */
export function Header() {
  return (
    <HeaderShell>
      <Navbar />
    </HeaderShell>
  );
}
