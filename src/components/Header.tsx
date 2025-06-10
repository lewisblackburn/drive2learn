'use client';

import { usePathname } from 'next/navigation';

import Banner from './Banner';
import Navbar2 from './Navbar2';

export default function Header() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) {
    return null;
  }

  return (
    <>
      <Banner />
      <Navbar2 />
    </>
  );
}
