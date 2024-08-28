/* eslint-disable @next/next/no-img-element */
'use client';

import * as React from 'react';
import '@/lib/env';

import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import { Recruitment } from '@/components/Recruitment';
import { Team } from '@/components/Team';

export default function TeamPage() {
  return (
    <main className='flex flex-col h-screen justify-between'>
      <header>
        <Banner />
        <Navbar />
      </header>
      {/* mb-auto needed for bottom footer */}
      <section className='mb-auto'>
        <PageHeader
          title='Meet the Team'
          description='Our team of talented instructors are here to help you learn to drive safely and confidently. We are dedicated to helping you pass your driving test and become a safe driver for life.'
          image='/images/headers/2.jpg'
        />
        <Team />
        <Recruitment />
      </section>
      <Footer />
    </main>
  );
}
