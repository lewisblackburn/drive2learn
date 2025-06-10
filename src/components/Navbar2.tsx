'use client';

import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { siteConfig } from '@/constant/config';

export default function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='bg-foreground text-white sticky top-0 z-[100] w-full backdrop-blur'>
      <div className='flex flex-col md:flex-row items-center justify-between px-3 md:px-5 xl:px-32 py-3 md:py-5'>
        <nav className='flex w-full items-center justify-between'>
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/images/logo4.svg'
              alt='Logo'
              width={150}
              height={100}
            />
          </Link>
          <NavigationMenu className='ml-auto hidden lg:block'>
            <NavigationMenuList className='gap-6'>
              {siteConfig.navigationLinks.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.links ? (
                    <>
                      <NavigationMenuTrigger className='bg-transparent text-white hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary rounded-md px-4 py-2 text-base font-medium transition-colors'>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className='border-none bg-foreground text-white p-6'>
                        <div className='grid w-[400px] grid-cols-1 gap-4'>
                          {item.links.map((link) => (
                            <NavigationMenuLink
                              key={link.title}
                              href={link.href}
                              className='bg-transparent hover:bg-primary/10 hover:text-primary block rounded-md p-3 text-base font-medium transition-colors text-white'
                            >
                              <div className='flex flex-col gap-1'>
                                <span className='font-medium text-white'>
                                  {link.title}
                                </span>
                                {link.description && (
                                  <span className='text-sm text-gray-400'>
                                    {link.description}
                                  </span>
                                )}
                              </div>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={item.href}
                      className='bg-transparent text-white hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary rounded-md px-4 py-2 text-base font-medium transition-colors'
                    >
                      {item.title}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className='ml-auto lg:hidden'>
              <Button
                variant='ghost'
                size='icon'
                className='hover:bg-primary/10 hover:text-primary'
              >
                <MenuIcon className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent
              side='top'
              className='border-none bg-foreground text-white w-full z-[999] p-0'
            >
              <SheetHeader className='border-none p-4'>
                <SheetTitle>
                  <Link
                    href='/'
                    className='flex items-center gap-2'
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src='/images/logo4.svg'
                      alt='Logo'
                      width={150}
                      height={100}
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className='flex flex-col space-y-1 px-4 pb-4'>
                <Accordion type='single' collapsible className='w-full'>
                  {siteConfig.navigationLinks.map((item) => (
                    <AccordionItem
                      key={item.title}
                      value={item.title}
                      className='border-none'
                    >
                      {item.links ? (
                        <>
                          <AccordionTrigger className='hover:bg-primary/10 hover:text-primary rounded-md px-4 py-2 text-base transition-colors hover:no-underline'>
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className='grid gap-1 px-4 pt-1'>
                              {item.links.map((link) => (
                                <Link
                                  key={link.title}
                                  href={link.href}
                                  className='hover:bg-primary/10 hover:text-primary block rounded-md p-2 text-sm transition-colors'
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div className='flex flex-col gap-1'>
                                    <span className='font-medium'>
                                      {link.title}
                                    </span>
                                    {link.description && (
                                      <span className='text-sm text-gray-400'>
                                        {link.description}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className='hover:bg-primary/10 hover:text-primary block rounded-md px-4 py-2 text-base font-medium transition-colors'
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
