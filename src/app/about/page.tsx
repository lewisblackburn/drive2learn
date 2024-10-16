import Image from 'next/image';
import * as React from 'react';
import '@/lib/env';

import { createClient } from '@/lib/supabase/server';

import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import { Recruitment } from '@/components/Recruitment';
import StudentReviews from '@/components/StudentReviews';
import { Team } from '@/components/Team';

export default async function AboutPage() {
  const supabase = createClient();
  const { data: image } = await supabase
    .from('images')
    .select('*')
    .eq('type', 'map')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
    ? process.env.NEXT_PUBLIC_STORAGE_URL + image.image
    : '';

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

      <Content image={filepath} />

      <Team />

      <Recruitment />

      <StudentReviews />

      {/* <section className='py-12'> */}
      {/*   <div className='max-w-screen-xl px-4 mx-auto text-center'> */}
      {/*     <h2 className='text-lg font-semibold text-gray-700'> */}
      {/*       Company Information */}
      {/*     </h2> */}
      {/*     <p className='mt-4 text-sm text-gray-500'> */}
      {/*       <strong>Drive 2 Learn Ltd</strong> */}
      {/*       <br /> */}
      {/*       Registered in England & Wales */}
      {/*       <br /> */}
      {/*       Company Number: 12345678 */}
      {/*     </p> */}
      {/*   </div> */}
      {/* </section> */}

      <Footer />
    </main>
  );
}

const Content = ({ image }: { image: string }) => {
  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      <div className='grid gap-8 row-gap-12 lg:grid-cols-2'>
        <div className='flex flex-col justify-center'>
          <div className='max-w-xl mb-6 space-y-6'>
            <h2 className='text-2xl font-semibold text-gray-800'>
              Welcome to Drive 2 Learn
            </h2>
            <p className='text-base text-gray-700 md:text-lg leading-relaxed'>
              Hello and welcome to <strong>Drive 2 Learn</strong>. We are a
              community of forward-thinking driving instructors with the aim of
              helping you achieve your driving goals. Everyone involved with
              Drive 2 Learn is professional, reliable, knowledgeable, and down
              to earth.
            </p>
            <p className='text-base text-gray-700 md:text-lg leading-relaxed'>
              Our ethos is to support everyone who needs us, and we take pride
              in guiding them on their journey. Whether you are a nervous
              driver, an anxious learner, or a stressed driving instructor
              seeking further training, we are here to help you achieve your
              objectives.
            </p>
            <p className='text-base text-gray-700 md:text-lg leading-relaxed'>
              At Drive 2 Learn, we continuously develop our skills and knowledge
              of the road rules and regulations enforced by the DVSA. We hold
              frequent meetings to discuss the latest developments and ensure
              that our students and instructors are well-informed.
            </p>
            <p className='text-base text-gray-700 md:text-lg leading-relaxed'>
              Every day, we strive to offer a unique and innovative experience
              to each individual, treating everyone with respect and courtesy.
            </p>
          </div>
        </div>

        <div
          id='locations'
          className='flex justify-center items-center scroll-m-12'
        >
          <div className='relative w-full h-80 xl:h-[500px]'>
            <Image
              src={image ?? '/images/map.png'}
              alt='UK map'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
