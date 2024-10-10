'use client';

import * as React from 'react';
import '@/lib/env';

import Banner from '@/components/Banner';
import Contact from '@/components/Contact';
import { Courses } from '@/components/Courses';
import Footer from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Hours } from '@/components/Hours';
import LogoCloud, { LogoCloud2 } from '@/components/LogoCloud';
import Navbar from '@/components/Navbar';
import { ServiceCards } from '@/components/ServiceCards';

import { useServices } from '@/app/hooks/useServices';

export default function HomePage() {
  const { loading, services } = useServices();

  return (
    <main className='flex flex-col h-screen justify-between'>
      <header>
        <Banner />
        <Navbar />
      </header>
      {/* mb-auto needed for bottom footer */}
      <section className='mb-auto'>
        <Hero />
        <Courses />
        <ServiceCards loading={loading} services={services.slice(0, 3)} />
        <Contact />
        <Hours />
        <LogoCloud />
        <LogoCloud2 />
      </section>
      <Footer />
    </main>
  );
}
