import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
    <section className='flex flex-col items-center justify-center text-black px-0 sm:px-20 pb-40 pt-60'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='mx-auto mb-[60px] max-w-[610px] text-center'>
              <h2 className='mb-6 text-3xl font-bold leading-[1.208] text-dark sm:text-4xl md:text-[40px]'>
                Courses Customised For You
              </h2>
              <p className='text-base text-body-color'>
                We offer various services to help you achieve your goals. Our
                aim is to provide you with the best possible service for your
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
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
                    <Link href={`/book?course=${course.title}`}>
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
                            href={`/book?id=${course.id}`}
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
