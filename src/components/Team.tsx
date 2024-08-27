/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
const SkeletonLoader = () => (
  <div className='text-center'>
    <div className='relative pb-56 mb-4 rounded lg:pb-64'>
      <div className='absolute object-contain object-center w-full h-full bg-gray-300 rounded'></div>
    </div>
    <div className='flex flex-col items-center'>
      <div className='w-24 h-6 bg-gray-300 mb-2 rounded'></div>
      <div className='w-32 h-4 bg-gray-300 mb-2 rounded'></div>
      <div className='w-40 h-4 bg-gray-300 rounded'></div>
    </div>
  </div>
);

import { useEffect, useState } from 'react';

import { TeamMember } from '@/app/hooks/useTeam';

export const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/team'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setMembers(data.team); // Adjust based on your API response structure
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-32'>
        <div className='grid gap-10 mx-auto sm:grid-cols-2 grid-cols-1 lg:max-w-screen-xl'>
          {[...Array(5)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-32'>
        <p className='text-center text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-32'>
      <div className='grid gap-10 mx-auto sm:grid-cols-2 grid-cols-1 lg:max-w-screen-xl'>
        {members.map((member) => {
          const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
            ? process.env.NEXT_PUBLIC_STORAGE_URL + member.image
            : '';

          return (
            <div key={member.name} className='text-center'>
              <div className='relative pb-56 mb-4 rounded lg:pb-64'>
                <img
                  className='absolute object-contain object-center w-full h-full rounded'
                  src={filepath}
                  alt={member.name}
                />
              </div>
              <div className='flex flex-col'>
                <p className='text-lg font-bold'>{member.name}</p>
                <p className='mb-2 text-xs text-gray-800'>{member.job_type}</p>
                <blockquote className='text-sm text-gray-600 italic'>
                  "{member.quote}"
                </blockquote>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
