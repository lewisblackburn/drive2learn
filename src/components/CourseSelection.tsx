'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FormSchema = z.object({
  course: z.string({
    required_error: 'Please select a course.',
  }),
  intensive: z.boolean().optional(),
  bookTest: z.boolean().optional(),
  transmission: z.enum(['manual', 'automatic'], {
    required_error: 'Please select a transmission type.',
  }),
});

export default function CourseSelection({
  services,
}: {
  services: {
    title: string;
    price: number;
    priceId: string;
    description: string;
    hours: number;
    deposit: number;
  }[];
}) {
  const searchParams = useSearchParams();
  const course = searchParams.get('course') ?? services[0].title;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      course,
      intensive: false,
      bookTest: false,
      transmission: 'manual',
    },
  });

  const selectedCourse = form.watch('course');

  const isAutomatic = form.watch('transmission') === 'automatic';

  return (
    <Form {...form}>
      <form
        action='/api/checkout'
        method='POST'
        className='w-full sm:w-2/3 space-y-6'
      >
        <input
          className='hidden'
          name='priceId'
          value={
            services.find(
              (service) => service.title === form.getValues('course'),
            )?.priceId ?? ''
          }
        />

        <FormField
          control={form.control}
          name='course'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Selection</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a course to book' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service, index) => (
                    <SelectItem key={index} value={service.title}>
                      {service.title} (£
                      {isAutomatic
                        ? (Number(service.price) * 1.1).toFixed(2)
                        : service.price}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can change your course selection above.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='intensive'
          render={({ field }) => (
            <FormItem>
              <div className='flex space-x-2 items-center'>
                <FormControl>
                  <input
                    type='checkbox'
                    id='intensive'
                    checked={field.value}
                    onChange={field.onChange}
                    className='peer h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                  />
                </FormControl>
                <FormLabel htmlFor='intensive'>Intensive Course</FormLabel>
              </div>
              <FormDescription>
                Select this option to book an intensive course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bookTest'
          render={({ field }) => (
            <FormItem>
              <div className='flex space-x-2 items-center'>
                <FormControl>
                  <input
                    type='checkbox'
                    id='book-a-test'
                    checked={field.value}
                    onChange={field.onChange}
                    className='peer h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                  />
                </FormControl>
                <FormLabel htmlFor='book-a-test'>
                  Would you like to book a test?
                </FormLabel>
              </div>
              <FormDescription>
                Select this option if you would like to book a test yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='transmission'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transmission</FormLabel>
              <div className='flex space-x-4'>
                <div className='flex items-center space-x-2'>
                  <FormControl>
                    <input
                      type='radio'
                      id='manual'
                      value='manual'
                      checked={field.value === 'manual'}
                      onChange={field.onChange}
                      className='peer h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                    />
                  </FormControl>
                  <FormLabel htmlFor='manual'>Manual</FormLabel>
                </div>
                <div className='flex items-center space-x-2'>
                  <FormControl>
                    <input
                      type='radio'
                      id='automatic'
                      value='automatic'
                      checked={field.value === 'automatic'}
                      onChange={field.onChange}
                      className='peer h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                    />
                  </FormControl>
                  <FormLabel htmlFor='automatic'>Automatic (+10%)</FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <p>
          {
            services.find((service) => service.title === selectedCourse)
              ?.description
          }
          <br />
          <br />
          <div className='flex flex-col space-y-1'>
            <p>
              <b>Hours</b>:{' '}
              {
                services.find((service) => service.title === selectedCourse)
                  ?.hours
              }
            </p>
            <p>
              <b>Deposit</b>:{' '}
              {
                services.find((service) => service.title === selectedCourse)
                  ?.deposit
              }
            </p>
          </div>
        </p>

        <Button type='submit'>Make a Deposit</Button>
      </form>
    </Form>
  );
}
