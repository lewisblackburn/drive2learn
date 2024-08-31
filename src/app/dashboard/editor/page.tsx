'use client';

import { useData } from '@/app/hooks/useData';

export default function DashboardServicesPage() {
  const { data } = useData();

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {data.map((page) => (
          <a
            key={page.id}
            href={`/dashboard/editor/${page.id}`}
            className='block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
          >
            <h2 className='text-xl font-semibold text-dark mb-2'>
              {page.title}
            </h2>
            <p className='text-gray-500'>Click to edit this page</p>
          </a>
        ))}
      </div>
    </div>
  );
}
