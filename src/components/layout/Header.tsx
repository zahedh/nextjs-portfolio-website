import { Navbar } from '@/components/ui';
import HeaderShell from './HeaderShell';

/** Site header containing the primary navigation bar. */
export default function Header() {
  return (
    <HeaderShell>
      <Navbar />
    </HeaderShell>
  );
}
