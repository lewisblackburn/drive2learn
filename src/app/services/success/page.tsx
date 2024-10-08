'use client';

import Link from 'next/link';
import * as React from 'react';
import { RiCheckFill } from 'react-icons/ri';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function SuccessPage() {
  const emailSentRef = React.useRef(false); // Ref to track email sent status

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success') && !emailSentRef.current) {
      emailSentRef.current = true; // Set the ref to prevent multiple sends

      toast({
        title: 'Deposit Successful!',
        description:
          'Thank you for your purchase. You will receive an email confirmation.',
      });
    } else if (!query.get('success')) {
      window.location.href = '/';
    }
  }, []);

  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black space-y-10'>
          <RiCheckFill
            size={60}
            className='drop-shadow-glow animate-flicker text-green-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Deposit Successful</h1>
          <Link href='/'>
            <Button>Back to home</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
