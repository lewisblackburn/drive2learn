'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { InfoIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Spinner from '@/components/Spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { useToast } from '@/components/ui/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  hours: string;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  isIntensive: z.boolean().default(false),
  useOwnCar: z.boolean().default(false),
  selectedCourseId: z
    .union([z.string(), z.number()])
    .refine((val) => String(val).length > 0, {
      message: 'Please select a course',
    }),
});

export const CourseSelection = ({ courses }: { courses: Course[] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      isIntensive: false,
      useOwnCar: false,
    },
    mode: 'onChange',
  });

  const calculatePricePerHour = (isIntensive: boolean, useOwnCar: boolean) => {
    const basePrice = 40;
    let finalPrice = basePrice;

    if (isIntensive) {
      finalPrice += 5;
    }

    if (useOwnCar) {
      finalPrice -= 5;
    }

    return finalPrice;
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    form.setValue('selectedCourseId', String(course.id), {
      shouldValidate: true,
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedCourse) {
      toast({
        title: 'Error',
        description: 'Please select a course first',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const finalPricePerHour = calculatePricePerHour(
        values.isIntensive,
        values.useOwnCar,
      );

      const message = `
Booking Details:

Course: ${selectedCourse.title}
Hours: ${selectedCourse.hours}
Description: ${selectedCourse.description}
Final Price per Hour: £${finalPricePerHour}

Preferences:
- Intensive Course: ${values.isIntensive ? 'Yes (+£5/hour)' : 'No'}
- Use Own Car: ${values.useOwnCar ? 'Yes (-£5/hour)' : 'No'}
      `.trim();

      const bookingResponse = await fetch('/api/course-booking', {
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
        '/api/course-booking-confirmation',
        {
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
      setSelectedCourse(null);
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

  // Watch form values to update pricing display
  const formValues = form.watch();

  return (
    <Form {...form}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await form.trigger();

          if (!isValid) {
            toast({
              title: 'Validation Error',
              description: 'Please fill in all required fields correctly',
              variant: 'destructive',
            });
            return;
          }

          await onSubmit(form.getValues());
        }}
        className='space-y-8'
      >
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
            <h2 className='text-2xl font-semibold'>Course Preferences</h2>
            <Alert className='!grid-cols-[auto_1fr] !gap-x-2 bg-primary/5 border-primary/20 text-primary/90'>
              <InfoIcon className='h-4 w-4 text-primary' />
              <AlertDescription className='font-medium'>
                Our base price is £40 per hour. Select your preferences below to
                customize your course.
              </AlertDescription>
            </Alert>

            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='isIntensive'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Intensive Course (+£5/hour)</FormLabel>
                      <FormDescription>
                        Select if you prefer an intensive learning schedule.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='useOwnCar'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Use Own Car (-£5/hour)</FormLabel>
                      <FormDescription>
                        Select if you want to use your own car for lessons. Our
                        instructors are insured to teach in any car as long as
                        you have insurance.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex gap-4'>
              <Button
                type='button'
                onClick={prevStep}
                variant='outline'
                className='w-full'
              >
                Back
              </Button>
              <Button type='button' onClick={nextStep} className='w-full'>
                {formValues.isIntensive || formValues.useOwnCar
                  ? 'Next'
                  : 'Skip'}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className='space-y-6'>
            <h2 className='text-2xl font-semibold'>Select Your Course</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {courses.map((course) => {
                const pricePerHour = calculatePricePerHour(
                  formValues.isIntensive,
                  formValues.useOwnCar,
                );
                return (
                  <div
                    key={course.id}
                    className={`p-6 rounded-lg border cursor-pointer transition-all flex flex-col h-full ${
                      selectedCourse?.id === course.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => handleCourseSelect(course)}
                  >
                    <h3 className='text-xl font-semibold mb-2'>
                      {course.title}
                    </h3>
                    <p className='text-gray-600 mb-4 flex-grow'>
                      {course.description}
                    </p>
                    <div className='flex justify-between items-center mt-auto'>
                      <span className='text-gray-600'>{course.hours}</span>
                      <span className='text-sm font-medium text-primary'>
                        £{pricePerHour}/hour
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
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
                disabled={!selectedCourse || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className='mr-2' />
                    Sending Request...
                  </>
                ) : (
                  'Request Booking'
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CourseSelection;
