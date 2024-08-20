'use client';

import { useEffect, useState } from 'react';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export default function Dashboard() {
  return (
    <div>
      <h1 className='mb-6 text-xl font-bold leading-[1.208] text-dark sm:text-2xl md:text-3xl'>
        Dashboard
      </h1>
      <div className='flex flex-col space-y-5 lg:space-x-5 lg:flex-row lg:space-y-0'>
        <GalleryInformation />
        <ReviewsInformation />
      </div>
    </div>
  );
}

interface Image {
  image: string;
  created_at: string;
}

interface ImagesData {
  images: Image[];
}

interface GroupedImages {
  date: string;
  count: number;
  images: Image[];
}

function groupImagesByDate(images: Image[]): GroupedImages[] {
  const grouped: { [key: string]: GroupedImages } = {};

  images.forEach((image) => {
    const date = image.created_at.split('T')[0]; // Extract the date part (YYYY-MM-DD)

    if (!grouped[date]) {
      grouped[date] = { date, count: 0, images: [] };
    }

    grouped[date].images.push(image);
    grouped[date].count++;
  });

  return Object.values(grouped);
}

const GalleryInformation = () => {
  const [imagesData, setImagesData] = useState<ImagesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data: ImagesData = await response.json();
        setImagesData(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading || !imagesData) {
    return <div></div>;
  }

  const { images } = imagesData;

  const groupedImages = groupImagesByDate(images);

  return (
    <Card className='w-full lg:max-w-xs' x-chunk='charts-01-chunk-7'>
      <CardHeader className='space-y-0 pb-0'>
        <CardDescription>Images in Gallery</CardDescription>
        <CardTitle className='flex items-baseline gap-1 text-4xl tabular-nums'>
          {images.length}
          <div />
          <span className='font-sans text-sm font-normal tracking-normal text-muted-foreground'>
            images
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <ChartContainer
          config={{
            time: {
              label: 'Time',
              color: 'hsl(var(--chart-2))',
            },
          }}
        >
          <AreaChart
            accessibilityLayer
            data={groupedImages.reverse()}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey='date' hide />
            <YAxis domain={['dataMin - 5', 'dataMax + 2']} hide />
            <defs>
              <linearGradient id='fillTime' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-time)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-time)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='count'
              type='natural'
              fill='url(#fillTime)'
              fillOpacity={0.4}
              stroke='var(--color-time)'
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value) => (
                <div className='flex items-center text-xs text-muted-foreground'>
                  <div className='ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground'>
                    {value}
                    <div />
                    <div />
                    <div />
                    <span className='font-normal text-muted-foreground'>
                      images added
                    </span>
                  </div>
                </div>
              )}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

interface Review {
  review: string;
  created_at: string;
}

interface ReviewsData {
  reviews: Review[];
}

interface GroupedReviews {
  date: string;
  count: number;
  reviews: Review[];
}

function groupReviewsByDate(reviews: Review[]): GroupedReviews[] {
  const grouped: { [key: string]: GroupedReviews } = {};

  reviews.forEach((review) => {
    const date = review.created_at.split('T')[0]; // Extract the date part (YYYY-MM-DD)

    if (!grouped[date]) {
      grouped[date] = { date, count: 0, reviews: [] };
    }

    grouped[date].reviews.push(review);
    grouped[date].count++;
  });

  return Object.values(grouped);
}

const ReviewsInformation = () => {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews/all');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data: ReviewsData = await response.json();
        setReviewsData(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading || !reviewsData) {
    return <div></div>;
  }

  const { reviews } = reviewsData;

  const groupedReviews = groupReviewsByDate(reviews);

  return (
    <Card className='w-full lg:max-w-xs' x-chunk='charts-01-chunk-7'>
      <CardHeader className='space-y-0 pb-0'>
        <CardDescription>Reviews</CardDescription>
        <CardTitle className='flex items-baseline gap-1 text-4xl tabular-nums'>
          {reviews.length}
          <div />
          <span className='font-sans text-sm font-normal tracking-normal text-muted-foreground'>
            reviews
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <ChartContainer
          config={{
            time: {
              label: 'Time',
              color: 'hsl(var(--chart-2))',
            },
          }}
        >
          <AreaChart
            accessibilityLayer
            data={groupedReviews.reverse()}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey='date' hide />
            <YAxis domain={['dataMin - 5', 'dataMax + 2']} hide />
            <defs>
              <linearGradient id='fillTime' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-time)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-time)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='count'
              type='natural'
              fill='url(#fillTime)'
              fillOpacity={0.4}
              stroke='var(--color-time)'
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value) => (
                <div className='flex items-center text-xs text-muted-foreground'>
                  <div className='ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground'>
                    {value}
                    <div />
                    <div />
                    <div />
                    <span className='font-normal text-muted-foreground'>
                      reviews added
                    </span>
                  </div>
                </div>
              )}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
