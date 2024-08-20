'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

async function submitImage(formData: FormData) {
  try {
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.message };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    return { success: false, message: 'An unexpected error occurred' };
  }
}

export default function UploadForm() {
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('url', url);

    const result = await submitImage(formData);

    if (result.success) {
      toast({ title: 'Success', description: result.message });
      setUrl('');
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form
      className='flex flex-col lg:flex-row lg:items-center items-start gap-4'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col lg:flex-row lg:items-center items-start gap-2 w-full'>
        <label htmlFor='url' className='w-32'>
          Facebook URL
        </label>
        <Input
          id='url'
          name='url'
          type='url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <Button type='submit' className='w-full lg:w-32' disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
