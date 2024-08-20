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
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CourseSelection({ services }: { services: any[] }) {
  const searchParams = useSearchParams();
  const course = searchParams.get('course') ?? services[0].title;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      course,
    },
  });

  const selectedCourse = form.watch('course');

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
                      {service.title} ({service.price})
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
