'use client';

import { Editor } from '@/components/Editor';
import { toast } from '@/components/ui/use-toast';

import { useData } from '@/app/hooks/useData';

export default function EditorPage({ params }: { params: { id: number } }) {
  const { getDataById, error } = useData();
  const paramID = parseInt(String(params.id));
  const data = getDataById(paramID);

  if (error) {
    toast({
      title: 'Error',
      description: error,
      variant: 'destructive',
    });
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <Editor data={data} />
    </div>
  );
}
