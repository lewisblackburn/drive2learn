import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';

import { siteConfig } from '@/constant/config';

export const MobileNav = ({ image }: { image: string }) => {
  const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
    ? process.env.NEXT_PUBLIC_STORAGE_URL + image
    : '';

  return (
    <Sheet>
      <SheetTrigger className='block lg:hidden'>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className='flex flex-col h-full justify-between overflow-y-scroll'>
        <div className='flex flex-col space-y-2 items-start'>
          {siteConfig.mobileNavigationLinks.map((link, index) => (
            <Link href={link.href} key={index}>
              <Button variant='ghost'>{link.title}</Button>
            </Link>
          ))}
        </div>
        <SheetFooter className='flex items-start'>
          <div className='relative w-full h-[300px] md:h-[500px]'>
            <Image
              src={filepath ?? '/images/map.png'}
              alt='UKL'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
