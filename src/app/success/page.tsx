'use client';

import Link from 'next/link';
import * as React from 'react';
import { RiCheckFill } from 'react-icons/ri';

import { ServiceCards } from '@/components/ServiceCards';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (!query.get('success')) {
      window.location.href = '/';
    }
  }, []);

  return (
    <main>
      <section className='bg-white mt-32'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black space-y-10'>
          <RiCheckFill
            size={60}
            className='drop-shadow-glow animate-flicker text-green-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Purchase Successful</h1>
          <p className='text-base text-gray-500'>
            Thank you for your purchase. You will receive an email confirmation.
          </p>
          <Link href='/'>
            <Button>Back to home</Button>
          </Link>
          <div className='text-start w-full'>
            <ServiceCards />
          </div>
        </div>
      </section>
    </main>
  );
}
