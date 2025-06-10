'use client';

import { Star } from 'lucide-react';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import { useRandomReviews } from '@/app/hooks/useRandomReviews';

const ReviewsCarousel = () => {
  const { reviews, loading } = useRandomReviews('student');

  if (loading || reviews.length === 0) {
    return null;
  }

  return (
    <section
      id='reviews-carousel'
      className='py-16 bg-white text-black scroll-mt-0'
    >
      <div className='container flex flex-col items-center gap-4'>
        <h2 className='text-center text-3xl font-semibold lg:text-4xl text-black'>
          What Our Students Say
        </h2>
        <p className='text-center text-gray-600 lg:text-lg'>
          Real feedback from our valued customers
        </p>
      </div>
      <div className='lg:container'>
        <div className='mt-16 space-y-4'>
          <Carousel
            opts={{
              loop: true,
              align: 'center',
            }}
            className='relative before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-12 sm:before:w-36 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-12 sm:after:w-36 after:bg-gradient-to-l after:from-white after:to-transparent'
          >
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className='basis-auto'>
                  <Card className='max-w-96 p-6 select-none bg-white border-gray-200 shadow-sm'>
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
                      {review.description}
                    </q>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { ReviewsCarousel };
