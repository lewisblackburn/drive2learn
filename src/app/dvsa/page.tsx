import Image from 'next/image';
import * as React from 'react';
import '@/lib/env';

import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';

export default function DVSAPage() {
  return (
    <main className='flex flex-col h-screen justify-between'>
      <header>
        <Banner />
        <Navbar />
      </header>
      {/* mb-auto needed for bottom footer */}
      <section className='mb-auto'>
        <PageHeader
          title='DVSA'
          description='Keeping Britain moving, safely and sustainably.'
          image='/images/headers/3.jpg'
        />
        <section className='bg-white relative max-w-7xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:px-8'>
          <div className='gap-16 items-center py-16 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
            <div className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
              <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
                Check what you need to do to learn to drive
              </h2>
              <p className='mb-4'>
                A helpful guided can be found on the DVSA website. Click on the
                link{' '}
                <a
                  href='https://www.gov.uk/learn-to-drive-a-car'
                  target='_blank'
                  rel='noreferrer'
                  className='text-primary/70'
                >
                  here
                </a>{' '}
                to see what you need to do next.
              </p>
              <p>
                We are dedicated to helping you pass your driving test and
                become a safe driver for life.
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4 mt-8'>
              <Image
                className='w-full rounded-lg'
                src='/images/dvsa1.jpg'
                alt='car content 1'
                width={500}
                height={500}
                priority
              />
              <Image
                className='mt-4 w-full lg:mt-10 rounded-lg'
                src='/images/dvsa2.jpg'
                alt='car content 2'
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </section>
        <section className='bg-white dark:bg-gray-900'>
          <div className='gap-16 items-center py-16 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
            <div className='flex flex-col justify-center font-light text-gray-500 sm:text-lg dark:text-gray-400'>
              <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
                About the questions
              </h2>
              <p>
                You’ll be asked 2{' '}
                <a
                  href='https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions'
                  target='_blank'
                  rel='noreferrer'
                  className='text-primary/70'
                >
                  vehicle safety questions
                </a>{' '}
                during your car driving test.
              </p>
              <p>
                We are dedicated to helping you pass your driving test and
                become a safe driver for life.
              </p>
              <iframe
                className='mt-16 mb-8 rounded-lg h-[500px] mx-0 lg:mx-32'
                src='https://www.youtube.com/embed/uh8slnP76-w?si=KZjcSO4BeT8jCWPO'
              />
              <p className='mb-4'>The examiner will ask you one:</p>
              <ul className='list-disc list-inside mb-4'>
                <li>
                  ‘tell me’ question (where you explain how you’d carry out a
                  safety task) at the start of your test, before you start
                  driving
                </li>
                <li>
                  ‘show me’ question (where you show how you’d carry out a
                  safety task) while you’re driving
                </li>
              </ul>
              <p>
                You’ll get one driving fault (sometimes called a ‘minor’) if you
                get one or both questions wrong.
              </p>
            </div>
          </div>
        </section>
        <div className='bg-white relative max-w-7xl mx-auto py-8 pb-24 lg:pb-32 px-4 sm:py-16 sm:px-6 lg:px-8'>
          <div className='grid gap-10 lg:grid-cols-2 items-center'>
            <div className='lg:pr-10'>
              <h5 className='mb-4 text-4xl font-extrabold leading-none'>
                Get ready for your driving test
              </h5>
              <p className='mb-6 text-gray-900'>
                Passing your driving test gives you independence and freedom.
                But taking your test too early could lead to a failed test,
                disappointment, and potentially delays to you getting on the
                road.
              </p>
              <p>
                Click{' '}
                <a
                  href='https://readytopass.campaign.gov.uk/'
                  target='_blank'
                  rel='noreferrer'
                  className='text-primary/70'
                >
                  here
                </a>{' '}
                to see if you are ready to pass your driving test.
              </p>
            </div>
            <div>
              <Image
                className='object-cover object-left w-full h-56 rounded shadow-lg sm:h-96'
                src='/images/ready-to-pass.jpg'
                alt='readdy-to-pass'
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
