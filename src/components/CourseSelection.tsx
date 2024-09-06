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
  intensive: z.boolean(),
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
        {/* A checkbox field to check whether they want the course to be intensive or not */}
        <div className='items-top flex space-x-2'>
          <input
            type='checkbox'
            id='intensive'
            name='intensive'
            className='peer h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
          />
          <div className='grid gap-1.5 leading-none'>
            <label
              htmlFor='terms1'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Intensive Course
            </label>
            <p className='text-sm text-muted-foreground'>
              Select this option to book an intensive course.
            </p>
          </div>
        </div>
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
