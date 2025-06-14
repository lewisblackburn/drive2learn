'use client';

import * as React from 'react';
import '@/lib/env';

import Footer from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import PageHeader from '@/components/PageHeader';
import Spinner from '@/components/Spinner';

import { useImages } from '@/app/hooks/useImages';

export default function GalleryPage() {
  const { loading, images } = useImages('gallery');

  return (
    <main className='flex flex-col h-screen justify-between'>
      {/* mb-auto needed for bottom footer */}
      <section className='mb-auto'>
        <PageHeader
          title='Gallery'
          description='The gallery of Drive 2 Learn, where you can see our students in action.'
          image='/images/headers/4.jpg'
        />

        <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
          {loading ? (
            <div className='flex items-center justify-center w-full mt-20'>
              <Spinner />
            </div>
          ) : (
            <>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
              <Gallery images={images} onDelete={() => {}} />
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
