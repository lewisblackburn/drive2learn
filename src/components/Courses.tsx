import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCar } from 'react-icons/fa';
import { TbManualGearbox } from 'react-icons/tb';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import { Course, useCourses } from '@/app/hooks/useCourses';

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const Courses = () => {
  const { loading, courses } = useCourses();

  const getTruncateLength = () => {
    if (typeof window === 'undefined') return 400;
    return window.innerWidth < 640 ? 200 : 400;
  };

  const [truncateLength, setTruncateLength] = useState(getTruncateLength());

  useEffect(() => {
    const handleResize = () => {
      setTruncateLength(getTruncateLength());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const placeholderCards = Array.from({ length: 3 }).map((_, index) => (
    <CarouselItem
      key={index}
      className='pl-4 basis-[85%] sm:basis-[45%] lg:basis-[33.333%]'
    >
      <Card className='w-full h-[470px] flex flex-col justify-between'>
        <div className='rounded-t-lg bg-gray-200 w-full h-[180px]' />
        <div className='p-5 flex-grow flex flex-col items-center'>
          <div className='h-6 w-3/4 bg-gray-200 rounded mb-4' />
          <div className='h-5 w-1/2 bg-gray-200 rounded mb-4' />
          <div className='space-y-2 w-full'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='h-4 w-full bg-gray-200 rounded' />
            ))}
          </div>
        </div>
        <div className='p-5 mt-auto flex justify-center'>
          <div className='h-5 w-24 bg-gray-200 rounded' />
        </div>
      </Card>
    </CarouselItem>
  ));

  return (
    <section className='bg-white text-black'>
      <div className='container mx-auto'>
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
                        Use Your Own Car
                      </h3>
                      <p className='mt-5 text-base text-gray-500'>
                        Our instructors are insured to teach in students' cars.
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

      <div className='mt-16'>
        <div className='lg:container'>
          <div className='space-y-4'>
            <Carousel
              opts={{
                loop: true,
                align: 'center',
                slidesToScroll: 1,
                containScroll: 'trimSnaps',
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnFocusIn: true,
                  stopOnMouseEnter: true,
                  stopOnLastSnap: true,
                  stopOnInteraction: true,
                }),
              ]}
              className='relative px-4 sm:px-0 before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-12 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent sm:before:hidden sm:after:hidden'
            >
              <CarouselContent className='-ml-4 flex items-center'>
                {loading
                  ? placeholderCards
                  : courses.map((course: Course, index) => {
                      const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
                        ? process.env.NEXT_PUBLIC_STORAGE_URL + course.image
                        : '';

                      return (
                        <CarouselItem
                          key={index}
                          className='pl-4 basis-[85%] sm:basis-[45%] lg:basis-[33.333%] flex items-center'
                        >
                          <Link href={`/courses?course=${course.title}`}>
                            <Card className='w-full h-[470px] flex flex-col justify-between'>
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
                                <h1 className='font-bold text-lg'>
                                  {course.title}
                                </h1>
                                <h2 className='font-semibold text-md my-2'>
                                  {course.hours}
                                </h2>
                                <p className='text-secondary-foreground/60 font-medium mb-4'>
                                  {truncateText(
                                    course.description,
                                    truncateLength,
                                  )}
                                </p>
                              </div>
                              <div className='p-5 mt-auto flex justify-between items-center'>
                                <span className='text-base font-semibold text-black'>
                                  From £40/hr
                                </span>
                                <Link
                                  href={`/courses?id=${course.id}`}
                                  className='text-primary font-medium flex items-center'
                                >
                                  Book Now
                                  <ArrowRight className='ml-1 h-4 w-4' />
                                </Link>
                              </div>
                            </Card>
                          </Link>
                        </CarouselItem>
                      );
                    })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};
