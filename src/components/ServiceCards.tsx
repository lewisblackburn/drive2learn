'use client';

import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import { useServices } from '@/app/hooks/useServices';

const List = ({ children }: { children: React.ReactNode }) => {
  return <p className='text-base text-body-color'>{children}</p>;
};

export const ServiceCards = () => {
  const { loading, services } = useServices();

  const placeholderCards = Array.from({ length: 3 }).map((_, index) => (
    <CarouselItem
      key={index}
      className='pl-4 basis-[85%] sm:basis-[45%] lg:basis-[33.333%]'
    >
      <Card className='w-full flex h-[650px] flex-col'>
        <div className='relative z-10 flex flex-col flex-grow justify-between overflow-hidden rounded-[10px] bg-white px-8 py-10 shadow-pricing sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]'>
          <div className='flex flex-col items-center'>
            <div className='h-6 w-32 bg-gray-200 rounded mb-3' />
            <div className='h-12 w-40 bg-gray-200 rounded mb-5' />
            <div className='mb-8 border-b border-stroke pb-8 w-full'>
              <div className='space-y-2'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='h-4 w-full bg-gray-200 rounded' />
                ))}
              </div>
            </div>
            <div className='mb-9 flex flex-col gap-[14px] w-full items-center'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='h-4 w-3/4 bg-gray-200 rounded' />
              ))}
            </div>
          </div>
          <div className='h-12 w-full bg-gray-200 rounded-md' />
        </div>
      </Card>
    </CarouselItem>
  ));

  return (
    <section className='relative z-10 overflow-hidden bg-white'>
      <div className='container mx-auto'>
        <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
          <h2 className='text-base font-semibold tracking-wider text-red-600 uppercase'>
            Services
          </h2>
          <p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
            Our Services
          </p>
          <p className='mt-5 max-w-prose mx-auto text-xl text-gray-500'>
            We offer various services to help you achieve your goals. Our aim is
            to provide you with the best possible service for your needs.
          </p>
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
                  : services.map((service, index) => {
                      const isActive = index % 2 === 0;

                      return (
                        <CarouselItem
                          key={index}
                          className='pl-4 basis-[85%] sm:basis-[45%] lg:basis-[33.333%] flex items-center'
                        >
                          <ServiceCard
                            key={service.id}
                            description={service.description}
                            price={service.price}
                            type={service.title}
                            buttonText='Read More'
                            buttonLink={
                              service.priceId
                                ? `/services?id=${service.id}`
                                : '/#contact'
                            }
                            active={isActive}
                          >
                            {service.points.split(',').map((list: string) => (
                              <List key={list}>{list}</List>
                            ))}
                          </ServiceCard>
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

const ServiceCard = ({
  children,
  description,
  price,
  type,
  buttonText,
  buttonLink,
  active,
}: {
  children: React.ReactNode;
  description: string;
  price: string;
  type: string;
  buttonText: string;
  buttonLink: string;
  active: boolean;
}) => {
  return (
    <Card className='w-full flex h-[650px] flex-col'>
      <div className='relative z-10 flex flex-col flex-grow justify-between overflow-hidden rounded-[10px] bg-white px-8 py-10 shadow-pricing sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]'>
        <div>
          <span className='mb-3 block text-lg font-semibold text-primary'>
            {type}
          </span>
          <h2 className='mb-5 text-[42px] font-bold text-dark'>{price}</h2>
          <p className='mb-8 border-b border-stroke pb-8 text-base text-body-color'>
            {description}
          </p>
          <div className='mb-9 flex flex-col gap-[14px]'>{children}</div>
        </div>

        <Link
          href={buttonLink}
          className={`mt-auto block w-full rounded-md border ${
            active
              ? 'border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90'
              : 'border-stroke bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white'
          }`}
        >
          {buttonText}
        </Link>
      </div>
    </Card>
  );
};
