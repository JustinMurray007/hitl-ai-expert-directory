import { isDemoMode } from '@/lib/store';
import NavbarClient from './NavbarClient';

export default function Navbar() {
  const demoActive = isDemoMode();
  return <NavbarClient demoActive={demoActive} />;
}

