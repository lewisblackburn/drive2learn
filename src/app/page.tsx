'use client';

import * as React from 'react';
import '@/lib/env';

import Contact from '@/components/Contact';
import { Courses } from '@/components/Courses';
import Footer from '@/components/Footer';
import Hero2 from '@/components/Hero2';
import { Hours } from '@/components/Hours';
import LogoCloud, { LogoCloud2 } from '@/components/LogoCloud';
import { ServiceCards } from '@/components/ServiceCards';
import { Testimonials } from '@/components/Testimonials';

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      <section>
        <Hero2 />
        <Courses />
        <ServiceCards />
        <Contact />
        <Hours />
        <LogoCloud />
        <LogoCloud2 />
        <Testimonials />
      </section>
      <Footer />
    </main>
  );
}
