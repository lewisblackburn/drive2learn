import Link from 'next/link';

import { useServices } from '@/app/hooks/useServices';

export const Services = () => {
  const { loading, services } = useServices();

  const placeholderCards = Array.from({ length: 3 }).map((_, index) => (
    <div key={index} className='w-full px-4 md:w-1/2 lg:w-1/3'>
      <div className='relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-gray-200 px-8 py-10 animate-pulse'>
        <span className='mb-3 block h-6 w-1/2 bg-gray-300' />
        <h2 className='mb-5 h-10 w-1/3 bg-gray-300' />
        <p className='mb-8 h-16 w-full bg-gray-300' />
        <div className='mb-9 flex flex-col gap-[14px]'>
          <div className='h-4 w-3/4 bg-gray-300' />
          <div className='h-4 w-2/3 bg-gray-300' />
        </div>
        <div className='block w-full h-10 bg-gray-300 rounded-md' />
      </div>
    </div>
  ));

  return (
    <section className='relative z-10 overflow-hidden bg-white pb-12 pt-10 lg:pb-[90px]'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='mx-auto mb-[60px] max-w-[510px] text-center'>
              <span className='mb-2 block text-lg font-semibold text-primary'>
                Pricing Table
              </span>
              <h2 className='mb-3 text-3xl font-bold leading-[1.208] text-dark sm:text-4xl md:text-[40px]'>
                Our Services
              </h2>
              <p className='text-base text-body-color'>
                We offer a range of services to help you pass your driving test
                and become a safe driver for life.
              </p>
            </div>
          </div>
        </div>

        <div className='-mx-4 flex flex-wrap justify-center'>
          {loading
            ? placeholderCards
            : services.map((service) => (
                <ServiceCard
                  key={service.id}
                  description={service.description}
                  price={service.price}
                  type={service.title}
                  buttonText='Read More'
                  buttonLink={
                    service.priceId ? `/services?id=${service.id}` : '/#contact'
                  }
                  active={!!service.active}
                >
                  {service.points.split(',').map((list: string) => (
                    <List key={list}>{list}</List>
                  ))}
                </ServiceCard>
              ))}
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
    <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
      <div className='relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 shadow-pricing sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]'>
        <span className='mb-3 block text-lg font-semibold text-primary'>
          {type}
        </span>
        <h2 className='mb-5 text-[42px] font-bold text-dark '>{price}</h2>
        <p className='mb-8 border-b border-stroke pb-8 text-base text-body-color'>
          {description}
        </p>
        <div className='mb-9 flex flex-col gap-[14px]'>{children}</div>
        <Link
          href={buttonLink}
          className={` ${
            active
              ? 'block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90'
              : 'block w-full rounded-md border border-stroke bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white'
          } `}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

const List = ({ children }: { children: React.ReactNode }) => {
  return <p className='text-base text-body-color'>{children}</p>;
};
