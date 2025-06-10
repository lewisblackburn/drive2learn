'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';
import '@/lib/env';

import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import PageLoader from '@/components/PageLoader';

import { useData } from '@/app/hooks/useData';

const Content = dynamic(() => import('@/components/Content'), {
  ssr: false,
}) as React.FC<{
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
}>;

export default function TermsPage() {
  const { loading: dataLoading, getDataById } = useData();
  const data = getDataById(1);

  if (dataLoading) return <PageLoader />;

  return (
    <main className='flex flex-col min-h-screen'>
      <section>
        <PageHeader
          title='Terms and Conditions'
          description="These terms and conditions outline the rules and regulations for the use of Drive 2 Learn's Website."
          image='/images/headers/4.jpg'
        />
      </section>

      <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
        <Content
          title={data?.title ?? 'No Title'}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          content={data?.content ?? ({ blocks: [] } as any)}
        />
      </div>

      <Footer />
    </main>
  );
}
