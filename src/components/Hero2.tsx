import {
  Award,
  Clock,
  MoveRight,
  PoundSterlingIcon,
  Shield,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Hero2() {
  return (
    <section className='relative py-20 md:py-28 lg:py-36'>
      <div className='absolute inset-0 z-0'>
        <div className='bg-black/80 absolute inset-0 z-10' />
        <Image
          src='https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1920&auto=format&fit=crop'
          alt='Driving lesson background'
          className='h-full w-full object-cover'
          fill
        />
      </div>

      <div className='relative z-20 container mx-auto px-4 md:px-6'>
        <div className='mx-auto max-w-4xl text-center'>
          <span className='mb-2 inline-block text-sm font-bold tracking-wider text-white uppercase md:text-base'>
            Drive 2 Learn
          </span>
          <h1 className='text-white mt-4 text-4xl leading-tight font-bold text-balance md:text-5xl lg:text-7xl lg:leading-[1.1]'>
            Learn to Drive with Confidence
          </h1>
          <p className='text-white/90 mt-6 text-lg'>
            At Drive 2 Learn, we work as hard as our students to make sure their
            driving ability is safe and to prepare them for the Test. We offer
            instructor training and the opportunity to join our successful and
            happy community.
          </p>
          <div className='mt-10 flex flex-col justify-center gap-4 sm:flex-row'>
            <Link href='/courses'>
              <Button
                size='lg'
                variant='secondary'
                className='px-8 py-6 text-base font-medium bg-white text-black hover:bg-white/90'
              >
                Book a Course
              </Button>
            </Link>
            <Link href='/#contact'>
              <Button
                size='lg'
                className='px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90'
              >
                Consultation
                <MoveRight className='ml-2 size-5' strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
          <div className='mt-10 lg:mt-12'>
            <ul className='flex flex-wrap justify-center gap-6 text-sm text-white/90 lg:text-base'>
              <li className='flex items-center gap-2.5 whitespace-nowrap'>
                <Shield className='text-primary size-5' />
                DVSA Approved
              </li>
              <li className='flex items-center gap-2.5 whitespace-nowrap'>
                <Clock className='text-primary size-5' />
                Flexible Hours
              </li>
              <li className='flex items-center gap-2.5 whitespace-nowrap'>
                <PoundSterlingIcon className='text-primary size-5' />
                Competitive Rates
              </li>
              <li className='flex items-center gap-2.5 whitespace-nowrap'>
                <Award className='text-primary size-5' />
                High Pass Rate
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
