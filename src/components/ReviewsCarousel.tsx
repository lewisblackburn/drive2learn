'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import { useRandomReviews } from '@/app/hooks/useRandomReviews';

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const ReviewsCarousel = () => {
  const { reviews, loading } = useRandomReviews('student');

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

  const placeholderCards = Array.from({ length: 5 }).map((_, index) => (
    <CarouselItem
      key={index}
      className='pl-4 basis-[85%] sm:basis-[45%] lg:basis-[33.333%]'
    >
      <Card className='w-full p-6 select-none bg-white border-gray-200 shadow-sm'>
        <div className='flex justify-between'>
          <div className='mb-4 flex gap-4'>
            <div>
              <div className='h-5 w-32 bg-gray-200 rounded mb-2 mx-auto' />
              <div className='h-4 w-24 bg-gray-200 rounded mx-auto' />
            </div>
          </div>
          <div className='flex gap-1 ml-5'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='size-5 bg-gray-200 rounded' />
            ))}
          </div>
        </div>
        <div className='space-y-2 flex flex-col items-center'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='h-4 w-full bg-gray-200 rounded' />
          ))}
        </div>
      </Card>
    </CarouselItem>
  ));

  return (
    <section id='reviews-carousel' className='bg-white text-black scroll-mt-0'>
      <div className='container mx-auto'>
        <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
          <h2 className='text-base font-semibold tracking-wider text-red-600 uppercase'>
            Testimonials
          </h2>
          <p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
            What Our Students Say
          </p>
          <p className='mt-5 max-w-prose mx-auto text-xl text-gray-500'>
            Real feedback from our valued customers
          </p>
        </div>
      </div>

      <div className='mt-16'>
        <div className='lg:container mx-auto'>
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
              className='relative px-4 sm:px-0 before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-12 sm:before:w-36 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-12 sm:after:w-36 after:bg-gradient-to-l after:from-white after:to-transparent'
            >
              <CarouselContent className='-ml-4'>
                {loading || reviews.length === 0
                  ? placeholderCards
                  : reviews.map((review) => (
                      <CarouselItem
                        key={review.id}
                        className='pl-4 basis-[85%] sm:basis-[45%] lg:basis-[33.333%]'
                      >
                        <Card className='w-full p-6 select-none bg-white border-gray-200 shadow-sm'>
                          <div className='flex justify-between'>
                            <div className='mb-4 flex gap-4'>
                              <div>
                                <p className='font-medium text-black'>
                                  {review.name}
                                </p>
                                <p className='text-sm text-gray-600'>
                                  {review.type === 'instructor'
                                    ? 'Driving Instructor'
                                    : 'Student'}
                                </p>
                              </div>
                            </div>
                            <div className='flex gap-1 ml-5'>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`size-5 ${
                                    i < (review.rating || 5)
                                      ? 'fill-red-500 text-red-500'
                                      : 'fill-gray-200 text-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <q className='leading-7 text-gray-600'>
                            {truncateText(review.description, truncateLength)}
                          </q>
                        </Card>
                      </CarouselItem>
                    ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ReviewsCarousel };
