import Link from 'next/link';
import * as React from 'react';

import { MobileNav } from '@/components/MobileNav';
import { NavigationMenuDemo } from '@/components/NavigationMenu';
import { Separator } from '@/components/ui/separator';

import { Logo } from './Logo';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <div className='flex items-center justify-between border h-32 pl-5 sm:px-20'>
      <Logo />
      <div className='flex items-center space-x-5'>
        <NavigationMenuDemo />
        <MobileNav />
        <Separator orientation='vertical' />
        <Link href='/#contact'>
          <Button
            className='hidden xl:flex uppercase font-bold text-xs tracking-widest text-white'
            size='lg'
          >
            Consultation
          </Button>
        </Link>
      </div>
    </div>
  );
}
