import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className='block lg:hidden'>
        <MenuIcon className='' />
      </SheetTrigger>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <SheetContent>
        <div className='flex flex-col space-y-2 items-start'>
          <Link href='/'>
            <Button variant='ghost'>Home</Button>
          </Link>
          <Link href='/about'>
            <Button variant='ghost'>About</Button>
          </Link>
          <Link href='/instructors'>
            <Button variant='ghost'>Instructors</Button>
          </Link>
          <Link href='dvsa'>
            <Button variant='ghost'>DVSA</Button>
          </Link>
          <Link href='/gallery'>
            <Button variant='ghost'>Gallery</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
