'use client';

import * as React from 'react';
import '@/lib/env';

import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import Products from '@/components/Products';

export default function ProductsPage() {
  return (
    <main className='flex flex-col h-screen justify-between'>
      {/* mb-auto needed for bottom footer */}
      <section className='mb-auto'>
        <PageHeader
          title='Products'
          description='The best products for your car.'
          image='/images/headers/1.jpg'
        />
        <Products />
      </section>
      <Footer />
    </main>
  );
}
