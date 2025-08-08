'use client';

import * as React from 'react';
import '@/lib/env';

import Contact from '@/components/Contact';
import { Courses } from '@/components/Courses';
import Footer from '@/components/Footer';
import Hero2 from '@/components/Hero2';
import LogoCloud, { LogoCloud2 } from '@/components/LogoCloud';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { ServiceCards } from '@/components/ServiceCards';
import Testimonials2 from '@/components/Testimonials2';

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      <section className='space-y-24 md:space-y-48'>
        <Hero2 />
        <ReviewsCarousel />
        <Courses />
        <ServiceCards />
        <Contact />
        <div>
          <LogoCloud />
          <LogoCloud2 />
        </div>
        <div className='!pb-24'>
          <Testimonials2 />
        </div>
      </section>
      <Footer />
    </main>
  );
}
