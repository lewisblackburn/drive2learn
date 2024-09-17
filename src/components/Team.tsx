'use client';

import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';

import { useTeam } from '@/app/hooks/useTeam';

export const Team = () => {
  const { team, loading } = useTeam();

  return (
    <section>
      <div className='bg-white'>
        <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
          <div className='space-y-12'>
            <div className='space-y-5 sm:space-y-4'>
              <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                The Team
              </h2>
              <p className='text-xl text-gray-500'>
                Meet the people who make Drive 2 Learn a great place to learn.
                We are a team of dedicated professionals who are passionate
                about helping you achieve your driving goals.
              </p>
            </div>
            {loading ? (
              <ul
                role='list'
                className='grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-12 space-y-12 lg:space-y-0'
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <li key={i} className='sm:py-8'>
                    <div className='grid grid-cols-3 items-start gap-6'>
                      <Skeleton className='w-full h-full aspect-[1] rounded-full' />
                      <div className='flex items-center justify-center col-span-2 h-full'>
                        <div className='space-y-4'>
                          <div className='text-lg leading-6 font-medium space-y-1'>
                            <Skeleton className='h-4 w-[50px] sm:w-[100px]' />
                            <p className='text-indigo-600'>
                              <Skeleton className='h-4 w-[100px] sm:w-[200px]' />
                            </p>
                          </div>
                          <div className='text-lg space-y-1'>
                            <Skeleton className='h-4 w-[150px] sm:w-[300px]' />
                            <Skeleton className='h-4 w-[50px] sm:w-[100px]' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul
                role='list'
                className='grid grid-cols-1 lg:grid-cols-2 gap-x-32 gap-y-12 space-y-12 lg:space-y-0'
              >
                {team.map((member) => {
                  const filepath =
                    process.env.NEXT_PUBLIC_STORAGE_URL + member.image;

                  return (
                    <li key={member.id} className='sm:py-8'>
                      <div className='grid grid-cols-3 items-start gap-6 '>
                        <div className='relative aspect-[1] w-full h-full'>
                          <Image
                            src={filepath}
                            alt={member.name}
                            layout='fill'
                            objectFit='contain'
                          />
                        </div>
                        <div className='flex items-center justify-center col-span-2 h-full'>
                          <div className='space-y-4'>
                            <div className='text-lg leading-6 font-medium space-y-1'>
                              <h3>{member.name}</h3>
                              <p className='text-indigo-600'>
                                {member.job_type}
                              </p>
                            </div>
                            <div className='text-lg'>
                              <p className='text-gray-500'>{member.quote}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
