'use client';

import * as React from 'react';
import '@/lib/env';

import Community from '@/components/Community';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

export default function CommunityPage() {
  return (
    <main className='flex flex-col h-screen justify-between'>
      {/* mb-auto needed for bottom footer */}
      <section className='mb-auto'>
        <PageHeader
          title='Community'
          description='Look at our community'
          image='/images/headers/3.jpg'
        />
        <Community />
      </section>
      <Footer />
    </main>
  );
}
