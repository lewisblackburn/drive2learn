import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <div className='relative flex flex-col-reverse py-24 lg:pt-0 lg:flex-col lg:pb-0'>
      <div className='inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0'>
        <svg
          className='absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block'
          viewBox='0 0 100 100'
          fill='currentColor'
          preserveAspectRatio='none slice'
        >
          <path d='M50 0H100L50 100H0L50 0Z' />
        </svg>
        <Image
          className='object-cover object-top w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full'
          src='/images/banner-img-3.jpg'
          alt='hero-image'
          width={500}
          height={500}
          priority
        />
      </div>
      <div className='relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-2xl'>
        <div className='mb-16 lg:my-40 lg:max-w-lg lg:pr-5'>
          <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none'>
            Welcome to
            <br className='hidden md:block' />{' '}
            <span className='inline-block text-deep-purple-accent-400'>
              Drive 2 Learn
            </span>
          </h2>
          <p className='pr-5 mb-5 text-base text-gray-700 md:text-lg'>
            At Drive 2 Learn, we work as hard as our students to make sure their
            driving ability is safe and to prepare them for the Test.{' '}
          </p>
          <p className='pr-5 mb-5 text-base text-gray-700 md:text-lg'>
            We offer instructor training and the opportunity to join our
            successful and happy community.
          </p>

          <div className='flex items-center'>
            <Link href='/about'>
              <Button
                className='uppercase font-bold text-xs tracking-widest text-white bg-black hover:bg-black/70'
                size='lg'
              >
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
