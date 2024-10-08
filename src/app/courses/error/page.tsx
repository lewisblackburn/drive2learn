'use client';

import Link from 'next/link';
import * as React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import '@/lib/env';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function ErrorPage() {
  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('canceled')) {
      setTimeout(() => {
        toast({
          title: 'Deposit Failed!',
          description:
            'Please try again or contact support if you continue to have issues.',
          variant: 'destructive',
        });
      }, 0);
    } else {
      window.location.href = '/';
    }
  }, []);

  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black space-y-10'>
          <RiErrorWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Deposit Failed</h1>
          <Link href='/'>
            <Button>Back to home</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
