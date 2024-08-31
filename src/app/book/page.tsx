'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';
import { Suspense } from 'react';
import '@/lib/env';

import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import PageLoader from '@/components/PageLoader';
import { toast } from '@/components/ui/use-toast';

import { useData } from '@/app/hooks/useData';
import { useServices } from '@/app/hooks/useServices';

const SelectFormClient = dynamic(() => import('@/components/CourseSelection'), {
  suspense: true,
});
const Content = dynamic(() => import('@/components/Content'), {
  ssr: false,
});

export default function BookPage() {
  const { loading: dataLoading, getDataById } = useData();
  const data = getDataById(1);
  const { loading, error, services } = useServices();

  if (loading || dataLoading) return <PageLoader />;

  if (error) {
    toast({
      title: 'Error',
      description: error,
      variant: 'destructive',
    });
  }

  return (
    <main className='flex flex-col h-screen justify-between'>
      <header>
        <Banner />
        <Navbar />
      </header>
      <section className='mb-auto'>
        <PageHeader
          title='Choose Your Course'
          description='Pick a course that suits you.'
        />
        <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
          <div className='container mx-auto px-4 py-8'>
            <div className='mb-24 -mt-24'>
              <Suspense fallback={<div>Loading...</div>}>
                <SelectFormClient services={services} />
              </Suspense>
            </div>

            <Content
              title={data?.title ?? 'No Title'}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              content={data?.content ?? ({ blocks: [] } as any)}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
