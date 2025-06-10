'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  priceId: string;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  service: z.string({
    required_error: 'Please select a service.',
  }),
});

export default function ServiceSelection({
  services,
}: {
  services: Service[];
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      service: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedService) {
      toast({
        title: 'Error',
        description: 'Please select a service first',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const message = `
Service Details:

Service: ${selectedService.title}
Price: ${selectedService.price}
      `.trim();

      const bookingResponse = await fetch('/api/service-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          phone: values.phoneNumber,
          email: values.email,
          message,
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error('Failed to send booking request');
      }

      const confirmationResponse = await fetch(
        '/api/service-booking-confirmation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            message,
          }),
        },
      );

      if (!confirmationResponse.ok) {
        throw new Error('Failed to send confirmation email');
      }

      toast({
        title: 'Booking Request Sent!',
        description: "We'll contact you shortly to confirm your booking.",
      });

      form.reset();
      setSelectedService(null);
      setCurrentStep(1);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send booking request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      const result = await form.trigger(['name', 'phoneNumber', 'email']);
      if (!result) return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {currentStep === 1 && (
          <div className='space-y-6'>
            <h2 className='text-2xl font-semibold'>Personal Information</h2>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your full name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your email address'
                      type='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your phone number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='button' onClick={nextStep} className='w-full'>
              Next
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className='space-y-6'>
            <h2 className='text-2xl font-semibold'>Select Your Service</h2>
            <FormField
              control={form.control}
              name='service'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Selection</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      const service = services.find((s) => s.title === value);
                      setSelectedService(service || null);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a service to book' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.title}>
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

            <div className='flex gap-4'>
              <Button
                type='button'
                onClick={prevStep}
                variant='outline'
                className='w-full'
              >
                Back
              </Button>
              <Button
                type='submit'
                className='w-full'
                disabled={!selectedService || isSubmitting}
              >
                {isSubmitting ? 'Sending Request...' : 'Request Booking'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
