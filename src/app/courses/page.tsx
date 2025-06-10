'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';
import { Suspense, useEffect } from 'react';
import '@/lib/env';

import Footer from '@/components/Footer';
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
}) as React.FC<{
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
}>;

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
      <section className='mb-auto'>
        <PageHeader
          title='Choose Your Course'
          description='Pick a course that suits you.'
          image='https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100'
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
