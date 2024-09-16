'use client';
import Link from 'next/link';
import * as React from 'react';

import { MobileNav } from '@/components/MobileNav';
import { NavigationMenuDemo } from '@/components/NavigationMenu';
import { Separator } from '@/components/ui/separator';

import { useImages } from '@/app/hooks/useImages';

import { Logo } from './Logo';
import { Button } from './ui/button';

export default function Navbar() {
  const { images, getImages } = useImages('map');

  React.useEffect(() => {
    getImages('map');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex items-center justify-between border h-32 pl-5 sm:px-20'>
      <Logo />
      <div className='flex items-center space-x-5'>
        <NavigationMenuDemo />
        <MobileNav image={images[0]?.image} />
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
