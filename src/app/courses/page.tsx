'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';
import { Suspense, useEffect } from 'react';
import '@/lib/env';

import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import PageLoader from '@/components/PageLoader';
import { toast } from '@/components/ui/use-toast';

import { useCourses } from '@/app/hooks/useCourses';
import { useData } from '@/app/hooks/useData';

const SelectFormClient = dynamic(() => import('@/components/CourseSelection'), {
  suspense: true,
});
const Content = dynamic(() => import('@/components/Content'), {
  ssr: false,
});

export default function CoursesPage() {
  const { loading: dataLoading, getDataById } = useData();
  const data = getDataById(1);
  const { loading, error, courses } = useCourses();

  useEffect(() => {
    setTimeout(() => {
      const termsElement = document.getElementById('terms');
      if (termsElement && window.location.hash === '#terms') {
        termsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }, [dataLoading]); // Ensure data is loaded before attempting to scroll

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
                {/* @ts-expect-error temp */}
                <SelectFormClient courses={courses} />
              </Suspense>
            </div>

            <div id='terms'>
              <Content
                title={data?.title ?? 'No Title'}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                content={data?.content ?? ({ blocks: [] } as any)}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
