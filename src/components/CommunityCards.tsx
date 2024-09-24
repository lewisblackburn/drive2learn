'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import NextImage from '@/components/NextImage';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';

import { Community, useCommunity } from '@/app/hooks/useCommunity';

const editCommunitySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const CommunityCards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null,
  );
  const {
    loading,
    data,
    editCommunity,
    addCommunity,
    deleteCommunity,
    updateImage,
  } = useCommunity();

  const methods = useForm<z.infer<typeof editCommunitySchema>>({
    resolver: zodResolver(editCommunitySchema),
    defaultValues: {
      title: selectedCommunity?.title ?? '',
      description: selectedCommunity?.description ?? '',
    },
  });

  useEffect(() => {
    methods.reset({
      title: selectedCommunity?.title ?? '',
      description: selectedCommunity?.description ?? '',
    });
  }, [selectedCommunity, methods]);

  function onSubmit(values: z.infer<typeof editCommunitySchema>) {
    if (!selectedCommunity) return;
    editCommunity(selectedCommunity.id, values);
    setIsDialogOpen(false);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    updateImage(
      file,
      selectedCommunity?.id ?? -1,
      selectedCommunity?.image ?? '',
    );
    e.target.value = ''; // Reset file input after upload
    setSelectedCommunity(null);
    setIsDialogOpen(false);
  };

  if (loading)
    return (
      <div className='flex items-center justify-center w-full mt-20'>
        <Spinner />
      </div>
    );

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <SheetContent className='overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>{selectedCommunity?.title}</SheetTitle>
            <SheetDescription>
              {selectedCommunity?.description}
            </SheetDescription>
          </SheetHeader>
          <div className='relative flex items-center justify-center p-4 border border-gray-300 rounded-lg bg-gray-50 my-6'>
            <input
              type='file'
              accept='image/*'
              onChange={handleChange}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            />
            <div className='flex flex-col items-center'>
              <Plus className='text-gray-500' size={40} />
              <p className='mt-2 text-gray-500'>
                Drag & Drop or Click to Upload
              </p>
            </div>
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <FormField
                control={methods.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the title of the community
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of the community
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-between w-full'>
                <Button
                  autoFocus={false}
                  onClick={() => {
                    selectedCommunity &&
                      deleteCommunity(
                        selectedCommunity.id,
                        selectedCommunity.image,
                      );
                    setIsDialogOpen(false);
                  }}
                  variant='destructive'
                  type='button'
                >
                  Delete
                </Button>
                <Button type='submit'>Submit</Button>
              </div>
            </form>
          </FormProvider>
        </SheetContent>
      </Sheet>
      <div
        className='bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-[500px] flex flex-col'
        onClick={() => {
          addCommunity({
            title: 'New Community',
            description: 'New Description',
          });
        }}
      >
        <div className='flex-grow'>
          <div className='flex items-center justify-center w-full h-full object-cover'>
            <Plus />
          </div>
        </div>
      </div>
      {data.map((community) => {
        const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
          ? process.env.NEXT_PUBLIC_STORAGE_URL + community.image
          : '';

        return (
          <div
            key={community.id}
            className='bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[500px] cursor-pointer'
            onClick={() => {
              setSelectedCommunity(community);
              setIsDialogOpen(true);
            }}
          >
            <div className='w-full h-48 relative'>
              <NextImage
                src={filepath}
                alt={community.title}
                layout='fill'
                fill
                classNames={{ image: 'w-full h-48 object-cover' }}
              />
            </div>
            <div className='flex-grow p-6 text-start'>
              <h2 className='text-xl font-bold mb-2'>{community.title}</h2>
              <p className='text-gray-700 mb-4'>{community.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
