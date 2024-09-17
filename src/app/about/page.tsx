'use client';

import * as React from 'react';
import '@/lib/env';

import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import PageLoader from '@/components/PageLoader';
import { Recruitment } from '@/components/Recruitment';
import Reviews from '@/components/Reviews';
import { Team } from '@/components/Team';

import { useImages } from '@/app/hooks/useImages';

export default function AboutPage() {
  const { images, loading } = useImages('map');
  const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
    ? process.env.NEXT_PUBLIC_STORAGE_URL + images[0]?.image
    : '';

  if (loading) return <PageLoader />;

  return (
    <main className='flex flex-col min-h-screen'>
      <header>
        <Banner />
        <Navbar />
      </header>

      <section>
        <PageHeader
          title='About Us'
          description='At Drive 2 Learn, we work as hard as our students to make sure their driving ability is safe and to prepare them for the Test.'
          subDescription='We offer instructor training and the opportunity to join our successful and happy community.'
          image='/images/headers/1.jpg'
        />
      </section>

      <section className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
          <div className='space-y-6 text-lg'>
            <p>
              Hello and welcome to <strong>Drive 2 Learn</strong>. We are a
              community of forward-thinking driving instructors with the aim of
              helping you achieve your driving goals. Everyone involved with
              Drive 2 Learn is professional, reliable, knowledgeable, and down
              to earth.
            </p>
            <p>
              Our ethos is to support everyone who needs us, and we take pride
              in guiding them on their journey. Whether you are a nervous
              driver, an anxious learner, or a stressed driving instructor
              seeking further training, we are here to help you achieve your
              objectives.
            </p>
            <p>
              At Drive 2 Learn, we continuously develop our skills and knowledge
              of the road rules and regulations enforced by the DVSA. We hold
              frequent meetings to discuss the latest developments and ensure
              that our students and instructors are well-informed.
            </p>
            <p>
              Every day, we strive to offer a unique and innovative experience
              to each individual, treating everyone with respect and courtesy.
            </p>
          </div>

          <div id='locations' className='flex justify-center'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={filepath ?? '/images/map.png'}
              alt='UK map'
              className='w-3/4 xl:w-full h-auto object-cover'
            />
          </div>
        </div>
      </section>

      <section>
        <Recruitment />
      </section>

      <section>
        <Team />
      </section>

      <section id='reviews'>
        <Reviews />
      </section>

      <Footer />
    </main>
  );
}
