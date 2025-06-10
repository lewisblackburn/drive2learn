'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { sendContactForm } from '@/lib/api';

import Spinner from '@/components/Spinner';
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

// Form validation schema using Zod
const FormSchema = z.object({
  course: z.string().nonempty({ message: 'Please select a course.' }),
  intensive: z.boolean().optional(),
  ownCar: z.boolean().optional(),
  name: z.string().nonempty({ message: 'Please enter your name.' }),
  phone: z.string().nonempty({ message: 'Please enter your phone number.' }),
});

interface Course {
  id: string;
  title: string;
  price: number;
  description: string;
  hours: number;
  deposit: number;
}

interface CourseSelectionProps {
  courses: Course[];
}

export default function CourseSelection({ courses }: CourseSelectionProps) {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id') ?? courses[0].id;
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const modifiedCourses = courses.map((course) => {
    const hoursString = course.hours;
    // @ts-expect-error - We are sure that the match method will return a string
    const parsedHours = parseInt(hoursString.match(/\d+/)?.[0] ?? '0', 10);

    const additionalCost = 5 * Number(parsedHours);
    return {
      ...course,
      manualPrice: course.price,
      automaticPrice: Number(course.price) + Number(additionalCost),
    };
  });

  const initialCourse = modifiedCourses.find(
    (course) => parseInt(course.id, 10) === parseInt(courseId, 10),
  )?.title;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      course: initialCourse || '',
      intensive: false,
      ownCar: false,
      name: '',
      phone: '',
    },
  });

  const selectedCourse = form.watch('course');
  const isIntensive = form.watch('intensive');
  const isOwnCar = form.watch('ownCar');
  const currentCourse = modifiedCourses.find(
    (course) => course.title === selectedCourse,
  );

  const calculatePrice = (basePrice: number) => {
    let finalPrice = basePrice;
    if (isIntensive) finalPrice += 5;
    if (isOwnCar) finalPrice -= 5;
    return finalPrice;
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const message = `
Course: ${data.course}
Intensive Course: ${data.intensive ? 'Yes (+£5)' : 'No'}
Own Car: ${data.ownCar ? 'Yes (-£5)' : 'No'}
Hours: ${currentCourse?.hours}

Customer Details:
Name: ${data.name}
Phone: ${data.phone}
      `;

      const result = await sendContactForm({
        subject: "Drive2Learn's Course Booking",
        name: data.name,
        email: 'bookings@drive2learn.co.uk',
        phone: data.phone,
        message,
      });

      toast({
        title: result.message,
      });

      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send booking request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full sm:w-2/3 space-y-6'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your name' {...field} />
              </FormControl>
              <FormDescription>Please enter your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Phone Number</FormLabel>
              <FormControl>
                <Input placeholder='Enter your phone number' {...field} />
              </FormControl>
              <FormDescription>
                We'll contact you on this number to confirm your booking.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
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
                  {modifiedCourses.map((course) => (
                    <SelectItem key={course.id} value={course.title}>
                      {course.title}
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

        <div className='flex flex-col space-y-4'>
          <FormField
            control={form.control}
            name='intensive'
            render={({ field }) => (
              <FormItem>
                <div className='flex space-x-2 items-center'>
                  <FormControl>
                    <Input
                      type='checkbox'
                      id='intensive'
                      checked={field.value}
                      onChange={field.onChange}
                      className='peer h-4 w-4 accent-primary text-primary focus:ring-primary border-gray-300 rounded'
                    />
                  </FormControl>
                  <FormLabel htmlFor='intensive'>
                    Intensive Course (+£5)
                  </FormLabel>
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
            name='ownCar'
            render={({ field }) => (
              <FormItem>
                <div className='flex space-x-2 items-center'>
                  <FormControl>
                    <Input
                      type='checkbox'
                      id='ownCar'
                      checked={field.value}
                      onChange={field.onChange}
                      className='peer h-4 w-4 accent-primary text-primary focus:ring-primary border-gray-300 rounded'
                    />
                  </FormControl>
                  <FormLabel htmlFor='ownCar'>
                    Using Your Own Car (-£5)
                  </FormLabel>
                </div>
                <FormDescription>
                  Select this option if you'll be using your own car for the
                  lessons.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <p>
          {currentCourse?.description}
          <br />
          <br />
          <div className='flex flex-col space-y-1'>
            <p>
              <b>Hours</b>: {currentCourse?.hours}
            </p>
          </div>
        </p>

        <Button type='submit' disabled={loading}>
          {loading ? <Spinner className='text-white' /> : 'Request Booking'}
        </Button>
      </form>
    </Form>
  );
}
