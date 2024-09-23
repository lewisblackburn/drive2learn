import { Speech } from 'lucide-react';

export default function Issues() {
  return (
    <div className='z-[100]'>
      <div className='bg-red-600'>
        <div className='container mx-auto py-3 px-3 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between flex-wrap gap-3'>
            <div className='flex items-center w-full sm:w-auto flex-1'>
              <span className='flex p-2 rounded-lg bg-red-800'>
                <Speech className='h-6 w-6 text-white' aria-hidden='true' />
              </span>
              <p className='ml-3 font-medium text-white truncate'>
                <span>Having issues on the site? Let us know!</span>
              </p>
            </div>
            <div className='flex-shrink-0 order-3 w-full sm:order-2 sm:w-auto sm:mt-0 mt-2'>
              <a
                href='#contact'
                className='flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50'
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
