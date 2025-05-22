// NOTE: These are logos and don't need to be optimised as they are at the bottom of the page and will change a lot.
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function LogoCloud() {
  return (
    <div className='bg-red-200 bg-opacity-25 py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className=''>
          <h2 className='max-w-md mx-auto text-3xl font-extrabold text-red-900 text-center '>
            We are huge supporters of Brake the road safety charity.
          </h2>
          <div className='flow-root self-center mt-12'>
            <div className='-mt-4 -ml-8 flex flex-wrap justify-between'>
              <Link
                href='https://www.brake.org.uk/'
                className='mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center'
              >
                <img className='h-12' src='/images/brake.png' alt='brake' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LogoCloud2() {
  return (
    <div className='bg-red-200 bg-opacity-25 py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className=''>
          <h2 className='max-w-md mx-auto text-3xl font-extrabold text-red-900 text-center '>
            We are proud to be members of the following associations.
          </h2>
          <div className='flow-root self-center mt-12'>
            <div className='-mt-4 -ml-8 flex flex-wrap gap-24 justify-center'>
              <Link
                href='https://www.driving.org/'
                className='mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4'
              >
                <img className='h-12' src='/images/dia.png' alt='DIA' />
              </Link>
              <Link
                href='https://sddia.co.uk/'
                className='mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4'
              >
                <img className='h-12' src='/images/sddia.png' alt='SDDIA' />
              </Link>
              <Link
                href='https://n-a-s-p.co.uk/'
                className='mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4'
              >
                <img className='h-12' src='/images/nasp.png' alt='NASP' />
              </Link>
              <Link
                href='https://msagb.com/'
                className='mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4'
              >
                <img className='h-12' src='/images/msagb.png' alt='MSAGB' />
              </Link>
              <Link
                href='https://www.lofaway2pass.com/'
                className='mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4'
              >
                <img
                  className='h-12'
                  src='/images/l-of-a-way-to-pass.png'
                  alt='L of a way to pass'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
