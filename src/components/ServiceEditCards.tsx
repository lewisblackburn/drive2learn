'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  description: z.string(),
  priceId: z.string(),
  price: z.string(),
  points: z.string(),
  active: z.boolean(),
});

export const ServiceEditCards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { loading, services, editService, addService, deleteService } =
    useServices();

  const methods = useForm<z.infer<typeof editServiceSchema>>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      title: selectedService?.title ?? '',
      description: selectedService?.description ?? '',
      priceId: selectedService?.priceId ?? '',
      price: selectedService?.price ?? '',
      points: selectedService?.points ?? '',
      active: selectedService?.active ?? false,
    },
  });

  useEffect(() => {
    methods.reset({
      title: selectedService?.title ?? '',
      description: selectedService?.description ?? '',
      priceId: selectedService?.priceId ?? '',
      price: selectedService?.price ?? '',
      points: selectedService?.points ?? '',
      active: selectedService?.active ?? false,
    });
  }, [selectedService, methods]);

  function onSubmit(values: z.infer<typeof editServiceSchema>) {
    if (!selectedService) return;
    editService(selectedService.id, values);
    setIsDialogOpen(false);
  }

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
            <SheetTitle>{selectedService?.title}</SheetTitle>
            <SheetDescription>{selectedService?.description}</SheetDescription>
          </SheetHeader>
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
                name='points'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Specify the points for the service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='active'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex space-x-2 items-center'>
                      <FormControl>
                        <Input
                          type='checkbox'
                          id='active'
                          checked={field.value}
                          onChange={field.onChange}
                          className='peer h-4 w-4 accent-primary text-primary focus:ring-primary border-gray-300 rounded'
                        />
                      </FormControl>
                      <FormLabel htmlFor='active'>Active</FormLabel>
                    </div>
                    <FormDescription>
                      Select this option to make the Read More button active
                      (turn red).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-between w-full'>
                <Button
                  autoFocus={false}
                  onClick={() => {
                    selectedService && deleteService(selectedService.id);
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
        className='bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-[350px] flex flex-col'
        onClick={() => {
          addService({
            title: 'New Service',
            description: 'New Description',
            priceId: 'New Price ID',
            price: 'New Price',
            points: 'Point 1, Point 2, Point 3, Point 4',
            active: false,
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
        return (
          <div
            key={service.id}
            className='bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[350px] cursor-pointer'
            onClick={() => {
              setSelectedService(service);
              setIsDialogOpen(true);
            }}
          >
            <div className='flex-grow p-6 text-start'>
              <h2 className='text-xl font-bold mb-2'>{service.title}</h2>
              <p className='text-gray-700 mb-4'>{service.description}</p>
            </div>
            <div className='p-6 border-t border-gray-200'>
              <div className='flex items-center justify-between'>
                <span></span>
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
