'use client';

import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { RiGoogleFill } from 'react-icons/ri';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { useReviews } from '@/app/hooks/useReviews';

export default function StudentReviews() {
  const { reviews, loadMoreReviews, hasMore, count, loading } = useReviews(
    'infinite',
    'student',
  );

  useEffect(() => {
    setTimeout(() => {
      const termsElement = document.getElementById('reviews');
      if (termsElement && window.location.hash === '#reviews') {
        termsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }, [loading]); // Ensure data is loaded before attempting to scroll

  return (
    <section id='reviews' className='bg-white scroll-mt-0'>
      <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8'>
        {/* Review Summary Section */}
        <div className='lg:col-span-4'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Customer Reviews
          </h2>
          <div className='mt-3 flex items-center'>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={cn(
                    reviews.length > 0 && reviews[0].rating > i
                      ? 'text-yellow-400'
                      : 'text-gray-300',
                    'h-5 w-5 fill-current',
                  )}
                  aria-hidden='true'
                />
              ))}
            </div>
            <p className='ml-2 text-sm text-gray-900'>
              Based on {count} reviews
            </p>
          </div>

          {/* Star Distribution */}
          <div className='mt-6'>
            <h3 className='sr-only'>Review data</h3>
            <dl className='space-y-3'>
              {[5, 4, 3, 2, 1].map((rating) => {
                const starCount = reviews.filter(
                  (r) => r.rating === rating,
                ).length;
                return (
                  <div key={rating} className='flex items-center text-sm'>
                    <dt className='flex-1 flex items-center'>
                      <p className='w-3 font-medium text-gray-900'>
                        {rating}
                        <span className='sr-only'> star reviews</span>
                      </p>
                      <div className='ml-1 flex-1 flex items-center'>
                        <StarIcon
                          className={cn(
                            starCount > 0 ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 fill-current',
                          )}
                          aria-hidden='true'
                        />
                        <div className='ml-3 relative flex-1'>
                          <div className='h-3 bg-gray-100 border border-gray-200 rounded-full' />
                          {starCount > 0 && (
                            <div
                              className='absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full'
                              style={{
                                width: `${(count / count) * 100}%`,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </dt>
                    <dd className='ml-3 w-10 text-right tabular-nums text-sm text-gray-900'>
                      {starCount === 0
                        ? '0'
                        : Math.round((count / count) * 100)}
                      %
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Review Link */}
          <div className='mt-10'>
            <h3 className='text-lg font-medium text-gray-900'>
              Looking for more reviews?
            </h3>
            <p className='mt-1 text-sm text-gray-600'>
              You can find more reviews on our Google Maps page.
            </p>
            <Link
              href='https://www.google.com/maps/place/Drive+2+Learn+with+Alex/@53.6398854,-1.3486284,15z/data=!4m6!3m5!1s0x4608cd089175e4af:0x2b5a6ab71f7937b4!8m2!3d53.5964898!4d-1.3942774!16s%2Fg%2F11t2f13q5m?entry=ttu'
              rel='noopener noreferrer'
              target='_blank'
              className='gap-2 mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full'
            >
              <RiGoogleFill />
              View All Reviews
            </Link>
          </div>
        </div>

        {/* Recent Reviews Section */}
        <div className='mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7'>
          <h3 className='sr-only'>Recent reviews</h3>
          <div className='flow-root'>
            {reviews.length < 1 ? (
              <div className='flex flex-col items-center space-x-4 -my-12 divide-y divide-gray-200'>
                {[...Array(10)].map((_, i) => (
                  <div key={i} className='space-y-2 py-12'>
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[700px]' />
                    <Skeleton className='h-4 w-[600px]' />
                    <Skeleton className='h-4 w-[500px]' />
                    <Skeleton className='h-4 w-[200px]' />
                  </div>
                ))}
              </div>
            ) : (
              <div className='-my-12 divide-y divide-gray-200'>
                {reviews.map((review) => (
                  <div key={review.id} className='py-12'>
                    <div className='flex items-center'>
                      <div>
                        <h4 className='text-sm font-bold text-gray-900'>
                          {review.name}
                        </h4>
                        <div className='mt-1 flex items-center'>
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={cn(
                                review.rating > i
                                  ? 'text-yellow-400'
                                  : 'text-gray-300',
                                'h-5 w-5 fill-current',
                              )}
                              aria-hidden='true'
                            />
                          ))}
                        </div>
                        <p className='sr-only'>
                          {review.rating} out of 5 stars
                        </p>
                      </div>
                    </div>
                    <div className='mt-4 space-y-6 text-base italic text-gray-600'>
                      {review.description}
                    </div>
                  </div>
                ))}
                {/* Load More Button */}
                <div className='pt-8'>
                  <Button
                    onClick={loadMoreReviews}
                    disabled={!hasMore || loading}
                    className='w-full justify-center'
                  >
                    {loading
                      ? 'Loading...'
                      : hasMore
                        ? 'Load more'
                        : 'No more reviews'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
