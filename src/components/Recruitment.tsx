/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';

const stats = [
  { label: 'Founded', value: '2021' },
  { label: 'Location', value: 'UK' },
];

export const Recruitment = () => {
  return (
    <div className='relative bg-white py-16 sm:py-24'>
      <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start'>
        <div className='relative sm:py-16 lg:py-0'>
          <div
            aria-hidden='true'
            className='hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen'
          >
            <div className='absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72' />
            <svg
              className='absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12'
              width={404}
              height={392}
              fill='none'
              viewBox='0 0 404 392'
            >
              <defs>
                <pattern
                  id='02f20b47-fd69-4224-a62a-4c9de5c763f7'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className='text-gray-200'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={392}
                fill='url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)'
              />
            </svg>
          </div>
          <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20'>
            <div className='relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden'>
              <img
                className='absolute inset-0 h-full w-full object-cover object-top'
                src='/images/alex.jpg'
                alt=''
              />
              <div className='absolute inset-0 bg-red-600 mix-blend-multiply' />
              <div className='absolute inset-0 bg-gradient-to-t from-red-700 via-red-700 opacity-90' />
              <div className='relative px-8'>
                <div>
                  <img
                    className='h-12'
                    src='/images/logo3.svg'
                    alt='Workcation'
                  />
                </div>
                <blockquote className='mt-8'>
                  <div className='relative text-lg font-medium text-white md:flex-grow'>
                    <svg
                      className='absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-red-400'
                      fill='currentColor'
                      viewBox='0 0 32 32'
                      aria-hidden='true'
                    >
                      <path d='M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z' />
                    </svg>
                    <p className='relative'>
                      I came into this industry because I wanted to take control
                      of my time, to make a difference on our roads and to help
                      people achieve their goals.
                    </p>
                  </div>

                  <footer className='mt-4'>
                    <p className='text-base font-semibold text-red-200'>
                      Alex, CEO at Drive 2 Learn
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0'>
          <div className='pt-12 sm:pt-16 lg:pt-20'>
            <h2 className='text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl'>
              We are now recruiting
            </h2>
            <div className='mt-6 text-gray-500 space-y-6'>
              <p className='text-lg'>
                If you would like to be part of our Drive 2 Learn community,
                please do not hesitate to get in touch. Whether you are a PDI,
                an ADI, or even considering entering this industry, we are here
                to help.{' '}
                <Link href='/#contact' className='text-primary'>
                  Reach out to us
                </Link>{' '}
                to find out more about the opportunities we have available.
              </p>
            </div>
          </div>

          {/* Stats section */}
          <div className='mt-10'>
            <dl className='grid grid-cols-2 gap-x-4 gap-y-8'>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className='border-t-2 border-gray-100 pt-6'
                >
                  <dt className='text-base font-medium text-gray-500'>
                    {stat.label}
                  </dt>
                  <dd className='text-3xl font-extrabold tracking-tight text-gray-900'>
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className='mt-10'>
              <a
                href='/instructor_training'
                className='text-base font-medium text-red-600'
              >
                {' '}
                Learn more about how we're making the roads safer.{' '}
                <span aria-hidden='true'>&rarr;</span>{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
