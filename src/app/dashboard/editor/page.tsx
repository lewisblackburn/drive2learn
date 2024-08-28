'use client';
import { Editor } from '@/components/Editor';

import { useData } from '@/app/hooks/useData';

export default function DashboardServicesPage() {
  const { getDataById } = useData();
  const data = getDataById(1);

  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold text-dark mb-6'>Editor</h1>
      <Editor data={data} />
    </div>
  );
}
