'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

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

import { Service, useServices } from '@/app/hooks/useServices';

const editServiceSchema = z.object({
  title: z.string(),
  hours: z.string(),
  description: z.string(),
  priceId: z.string(),
  price: z.string(),
  deposit: z.string(),
});

export const ServiceCards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const {
    loading,
    services,
    editService,
    addService,
    deleteService,
    updateImage,
  } = useServices();

  const methods = useForm<z.infer<typeof editServiceSchema>>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      title: selectedService?.title ?? '',
      hours: selectedService?.hours ?? '',
      description: selectedService?.description ?? '',
      priceId: selectedService?.priceId ?? '',
      price: selectedService?.price ?? '',
      deposit: selectedService?.deposit ?? '',
    },
  });

  useEffect(() => {
    methods.reset({
      title: selectedService?.title ?? '',
      hours: selectedService?.hours ?? '',
      description: selectedService?.description ?? '',
      priceId: selectedService?.priceId ?? '',
      price: selectedService?.price ?? '',
      deposit: selectedService?.deposit ?? '',
    });
  }, [selectedService, methods]);

  function onSubmit(values: z.infer<typeof editServiceSchema>) {
    if (!selectedService) return;
    editService(selectedService.id, values);
    setIsDialogOpen(false);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    updateImage(file, selectedService?.id ?? -1, selectedService?.image ?? '');
    e.target.value = ''; // Reset file input after upload
    setSelectedService(null);
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
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedService?.title}</SheetTitle>
            <SheetDescription>{selectedService?.description}</SheetDescription>
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
                      Enter the title of the service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='hours'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Specify the number of hours for the service
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
                      Provide a detailed description of the service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='priceId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the Stripe price ID for the service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Specify the price of the service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='deposit'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the deposit amount required for the service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-between w-full'>
                <Button
                  autoFocus={false}
                  onClick={() => {
                    selectedService &&
                      deleteService(selectedService.id, selectedService.image);
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
          addService({
            title: 'New Service',
            hours: 'New Hours',
            description: 'New Description',
            priceId: 'New Price ID',
            price: 'New Price',
            deposit: 'New Deposit',
          });
        }}
      >
        <div className='flex-grow'>
          <div className='flex items-center justify-center w-full h-full object-cover'>
            <Plus />
          </div>
        </div>
      </div>
      {services.map((service) => {
        const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
          ? process.env.NEXT_PUBLIC_STORAGE_URL + service.image
          : '';

        return (
          <div
            key={service.id}
            className='bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[500px] cursor-pointer'
            onClick={() => {
              setSelectedService(service);
              setIsDialogOpen(true);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={filepath}
              alt={service.title}
              className='w-full h-48 object-cover'
            />
            <div className='flex-grow p-6 text-start'>
              <h2 className='text-xl font-bold mb-2'>{service.title}</h2>
              <p className='text-gray-700 mb-4'>{service.description}</p>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-gray-600'>{service.hours}</span>
              </div>
            </div>
            <div className='p-6 border-t border-gray-200'>
              <div className='flex items-center justify-between'>
                <span className='text-gray-600'>
                  Deposit: {service.deposit}
                </span>
                <span className='text-xl font-semibold text-primary'>
                  {service.price}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
