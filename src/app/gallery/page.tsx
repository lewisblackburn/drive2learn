'use client';

import * as React from 'react';
import '@/lib/env';

import { createClient } from '@/lib/supabase/client';

import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import { toast } from '@/components/ui/use-toast';

export default function GalleryPage() {
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages] = React.useState<any[]>([]);

  // Function to fetch images from Supabase
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setImages(data || []);
    }
  };

  // Fetch images on component mount
  React.useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  return (
    <main className='flex flex-col h-screen justify-between'>
      <header>
        <Banner />
        <Navbar />
      </header>
      {/* mb-auto needed for bottom footer */}
      <section className='mb-auto'>
        <PageHeader
          title='Gallery'
          description='The gallery of Drive 2 Learn, where you can see our students in action.'
          image='/images/headers/4.jpg'
        />

        <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Gallery images={images} onDelete={() => {}} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
