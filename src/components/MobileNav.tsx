import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { siteConfig } from '@/constant/config';

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
          {siteConfig.navigationLinks.map((link, index) => (
            <Link href={link.href} key={index}>
              <Button variant='ghost'>{link.title}</Button>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
