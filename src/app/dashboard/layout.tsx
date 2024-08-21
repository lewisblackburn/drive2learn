import {
  Car,
  Home,
  Image,
  LogOut,
  PanelLeft,
  Star,
  Users2,
  Workflow,
  WorkflowIcon,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { logout } from '@/app/login/actions';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
        <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
          <Link
            href='/'
            className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
          >
            <Car className='h-4 w-4 transition-all group-hover:scale-110' />
            <span className='sr-only'>Drive 2 Learn</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href='/dashboard'
                  className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                >
                  <Home className='h-5 w-5' />
                  <span className='sr-only'>Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href='/dashboard/gallery'
                  className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image className='h-5 w-5' />
                  <span className='sr-only'>Gallery</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>Gallery</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href='/dashboard/reviews'
                  className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                >
                  <Star className='h-5 w-5' />
                  <span className='sr-only'>Reviews</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>Reviews</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href='/dashboard/services'
                  className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                >
                  <Workflow className='h-5 w-5' />
                  <span className='sr-only'>Services</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>Services</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href='/dashboard/team'
                  className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                >
                  <Users2 className='h-5 w-5' />
                  <span className='sr-only'>Team</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>Team</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <form
                  className='flex h-9 w-9 items-center justify-center rounded-lg cursor-pointer text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  action={logout}
                >
                  <button type='submit'>
                    <LogOut className='h-5 w-5' />
                    <span className='sr-only'>Logout</span>
                  </button>
                </form>
              </TooltipTrigger>
              <TooltipContent side='right'>Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className='flex flex-col sm:gap-4 sm:py-2 sm:pl-14'>
        <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icon' variant='outline' className='sm:hidden'>
                <PanelLeft className='h-5 w-5' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='sm:max-w-xs'>
              <nav className='grid gap-6 text-lg font-medium'>
                <Link
                  href='/'
                  className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                >
                  <Car className='h-5 w-5 transition-all group-hover:scale-110' />
                  <span className='sr-only'>Acme Inc</span>
                </Link>
                <a
                  href='/dashboard'
                  className='flex items-center gap-4 px-2.5 text-foreground'
                >
                  <Home className='h-5 w-5' />
                  Dashboard
                </a>
                <a
                  href='/dashboard/gallery'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image className='h-5 w-5' />
                  Gallery
                </a>
                <a
                  href='/dashboard/reviews'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Star className='h-5 w-5' />
                  Reviews
                </a>
                <a
                  href='/dashboard/services'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <WorkflowIcon className='h-5 w-5' />
                  Services
                </a>
                <a
                  href='/dashboard/team'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                >
                  <Users2 className='h-5 w-5' />
                  Team
                </a>
                <form action={logout}>
                  <button
                    type='submit'
                    className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                  >
                    <LogOut className='h-5 w-5' />
                    Logout
                  </button>
                </form>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className=' p-4 px-6 sm:py-0'>{children}</main>
      </div>
    </div>
  );
}
