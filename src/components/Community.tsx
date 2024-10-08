import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton'; // Import ShadCN UI Skeleton

import {
  Community as CommunityType,
  useCommunity,
} from '@/app/hooks/useCommunity';

function CommunityCard({ community }: { community: CommunityType }) {
  const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
    ? process.env.NEXT_PUBLIC_STORAGE_URL + community.image
    : '';

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
      <Image
        src={filepath}
        alt={community.title}
        transition-all
        duration-200
        className='object-cover w-full h-[300px]'
        width={400}
        height={300}
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-800'>
          {community.title}
        </h3>
        <p className='mt-2 text-sm text-gray-600'>{community.description}</p>
      </div>
    </div>
  );
}

function CommunitySkeletonCard() {
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
      <Skeleton className='w-full h-[300px]' />
      <div className='p-4'>
        <Skeleton className='h-6 w-3/4 mb-2' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-5/6 mt-2' />
      </div>
    </div>
  );
}

export default function Community() {
  const { loading, data } = useCommunity();

  if (loading) {
    return (
      <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Render Skeletons while loading */}
          <CommunitySkeletonCard />
          <CommunitySkeletonCard />
          <CommunitySkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {data.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
}
