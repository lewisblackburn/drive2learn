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
  service: z.string({
    required_error: 'Please select a service.',
  }),
  intensive: z.boolean().optional(),
  bookTest: z.boolean().optional(),
  transmission: z.enum(['manual', 'automatic'], {
    required_error: 'Please select a transmission type.',
  }),
});

export default function ServiceSelection({
  services,
}: {
  services: {
    id: string;
    title: string;
    price: number;
    priceId: string;
    description: string;
  }[];
}) {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('id') ?? services[0].id;
  const service = services.find(
    (service) => parseInt(service.id, 10) === parseInt(serviceId, 10),
  )?.title;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      service,
    },
  });

  const selectedService = form.watch('service');

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
              (service) => service.title === form.getValues('service'),
            )?.priceId ?? ''
          }
        />

        <FormField
          control={form.control}
          name='service'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Selection</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a service to book' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service, index) => (
                    <SelectItem key={index} value={service.title}>
                      {service.title} - {service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can change your service selection above.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          {
            services.find((service) => service.title === selectedService)
              ?.description
          }
          <br />
          <br />
        </p>

        <Button type='submit'>Make a deposit</Button>
      </form>
    </Form>
  );
}
