import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TbManualGearbox } from 'react-icons/tb';

import { FaCar } from 'react-icons/fa';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Course, useCourses } from '@/app/hooks/useCourses';

export const Courses = () => {
  const { loading, courses } = useCourses();

  const placeholderCards = Array.from({ length: 3 }).map((_, index) => (
    <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
      <Card className='rounded-lg h-[470px] flex flex-col justify-between bg-gray-200 animate-pulse'>
        <div className='rounded-t-lg bg-gray-300 w-full h-[180px]' />
        <div className='p-5 flex-grow'>
          <div className='bg-gray-300 h-6 w-1/2 mb-4' />
          <div className='bg-gray-300 h-4 w-1/3 mb-2' />
          <div className='bg-gray-300 h-3 w-full mb-4' />
        </div>
        <div className='p-5 mt-auto flex justify-between items-center'>
          <div className='bg-gray-300 h-4 w-1/3' />
          <div className='bg-gray-300 h-4 w-1/3' />
        </div>
      </Card>
    </CarouselItem>
  ));

  return (
    <section className='flex flex-col items-center justify-center text-black px-0 sm:px-20 pb-40 pt-30'>
      <div className='relative bg-white py-16 sm:py-24 lg:py-32'>
        <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
          <h2 className='text-base font-semibold tracking-wider text-red-600 uppercase'>
            Courses
          </h2>
          <p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
            Courses Customised For You
          </p>
          <p className='mt-5 max-w-prose mx-auto text-xl text-gray-500'>
            We offer a range of courses to help you pass your driving test and
            become a safe driver for life.
          </p>
          <div className='mt-12'>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              <Link href='/courses'>
                <div className='pt-6'>
                  <div className='flow-root bg-gray-50 rounded-lg px-6 pb-8'>
                    <div className='-mt-6'>
                      <div>
                        <span className='inline-flex items-center justify-center p-3 bg-red-500 rounded-md shadow-lg'>
                          <TbManualGearbox className='size-6 text-white' />
                        </span>
                      </div>
                      <h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
                        Manual Cars
                      </h3>
                      <p className='mt-5 text-base text-gray-500'>
                        Looking to start your driving lessons in a manual car?
                        Let's start today.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href='/courses'>
                <div className='pt-6'>
                  <div className='flow-root bg-gray-50 rounded-lg px-6 pb-8'>
                    <div className='-mt-6'>
                      <div>
                        <span className='inline-flex items-center justify-center p-3 bg-red-500 rounded-md shadow-lg'>
                          <Clock className='size-6 text-white' />
                        </span>
                      </div>
                      <h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
                        Intensive Courses
                      </h3>
                      <p className='mt-5 text-base text-gray-500'>
                        Fast track your driving lessons by making it intensive.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href='/services?id=1'>
                <div className='pt-6'>
                  <div className='flow-root bg-gray-50 rounded-lg px-6 pb-8'>
                    <div className='-mt-6'>
                      <div>
                        <span className='inline-flex items-center justify-center p-3 bg-red-500 rounded-md shadow-lg'>
                          <FaCar className='size-6 text-white' />
                        </span>
                      </div>
                      <h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
                        Hire a Car
                      </h3>
                      <p className='mt-5 text-base text-gray-500'>
                        Need a car for your test? Drive 2 Learn offers
                        stress-free manual vehicle hire.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnFocusIn: true,
            stopOnMouseEnter: true,
            stopOnLastSnap: true,
            stopOnInteraction: true,
          }),
        ]}
        className='container w-full'
      >
        <CarouselContent>
          {loading
            ? placeholderCards
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
              courses.map((course: Course, index) => {
                const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
                  ? process.env.NEXT_PUBLIC_STORAGE_URL + course.image
                  : '';

                return (
                  <CarouselItem
                    key={index}
                    className='md:basis-1/2 lg:basis-1/3'
                  >
                    <Link href={`/courses?course=${course.title}`}>
                      <Card className='rounded-lg h-[470px] flex flex-col justify-between'>
                        <Image
                          src={filepath}
                          className='rounded-t-lg object-cover object-center'
                          width={0}
                          height={180}
                          sizes='100vw'
                          style={{ width: '100%', height: '180px' }}
                          alt={course.title}
                        />
                        <div className='p-5 flex-grow'>
                          <h1 className='font-bold text-lg'>{course.title}</h1>
                          <h2 className='font-semibold text-md my-2'>
                            {course.hours} - £{course.price}
                          </h2>
                          <p className='text-secondary-foreground/60 font-medium mb-4'>
                            {course.description}
                          </p>
                        </div>
                        <div className='p-5 mt-auto flex justify-between items-center'>
                          <p className='text-secondary-foreground/60 font-medium'>
                            Deposit: £{course.deposit}
                          </p>
                          <Link
                            href={`/courses?id=${course.id}`}
                            className='text-primary font-medium flex items-center'
                          >
                            Find Out More
                            <ArrowRight className='ml-1 h-4 w-4' />
                          </Link>
                        </div>
                      </Card>
                    </Link>
                  </CarouselItem>
                );
              })}
        </CarouselContent>
        <CarouselPrevious className='top-[520px] left-10 sm:-left-12 sm:top-1/2' />
        <CarouselNext className='top-[520px] right-10 sm:-right-12 sm:top-1/2' />
      </Carousel>
    </section>
  );
};
