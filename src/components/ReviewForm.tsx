'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

async function submitReview(formData: FormData) {
  try {
    const response = await fetch('/api/reviews/create', {
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

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    const result = await submitReview(formData);

    if (result.success) {
      toast({ title: 'Success', description: result.message });
      setName('');
      setDescription('');
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
      className='flex flex-col items-start gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col items-start gap-2 w-full'>
        <label htmlFor='name' className='text-sm font-medium text-gray-700'>
          Name
        </label>
        <Input
          id='name'
          name='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='border-gray-300 rounded-md'
        />
      </div>
      <div className='flex flex-col items-start gap-2 w-full'>
        <label
          htmlFor='description'
          className='text-sm font-medium text-gray-700'
        >
          Description
        </label>
        <Textarea
          id='description'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className='border-gray-300 rounded-md'
        />
      </div>
      <Button type='submit' className='mt-4 w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
