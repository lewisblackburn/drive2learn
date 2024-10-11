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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Form validation schema using Zod
const FormSchema = z.object({
  course: z.string().nonempty({ message: 'Please select a course.' }),
  intensive: z.boolean().optional(),
  transmission: z.enum(['manual', 'automatic'], {
    required_error: 'Please select a transmission type.',
  }),
});

interface Course {
  id: string;
  title: string;
  price: number;
  priceId: string;
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

  // Fetch the initial selected course based on URL param or default to the first course
  const initialCourse = courses.find(
    (course) => parseInt(course.id, 10) === parseInt(courseId, 10),
  )?.title;

  // Initialize the form with default values and Zod schema resolver
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      course: initialCourse || '',
      intensive: false,
      transmission: 'manual',
    },
  });

  const selectedTransmission = form.watch('transmission');
  const selectedCourse = form.watch('course'); // Watch for course selection changes

  // Function to calculate price for each course, adjusting for transmission type
  const calculatePrice = (basePrice: number): string => {
    let finalPrice = basePrice;
    if (selectedTransmission === 'automatic') {
      finalPrice *= 1.1; // Add 10% for automatic transmission
    }
    return Number(finalPrice).toFixed(2).toString();
  };

  // Find the current selected course object
  const currentCourse = courses.find(
    (course) => course.title === selectedCourse,
  );

  return (
    <Form {...form}>
      <form
        action='/api/checkout'
        method='POST'
        className='w-full sm:w-2/3 space-y-6'
      >
        {/* Hidden input to send priceId */}
        <input
          type='hidden'
          name='priceId'
          value={currentCourse?.priceId ?? ''}
        />

        {/* Course Selection Dropdown */}
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
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.title}>
                      {course.title} (£{calculatePrice(course.price)})
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

        {/* Intensive Course Checkbox */}
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
                <FormLabel htmlFor='intensive'>Intensive Course</FormLabel>
              </div>
              <FormDescription>
                Select this option to book an intensive course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Transmission Type Radio Buttons */}
        <FormField
          control={form.control}
          name='transmission'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transmission</FormLabel>
              <div className='flex space-x-4'>
                <div className='flex items-center space-x-2'>
                  <FormControl>
                    <Input
                      type='radio'
                      id='manual'
                      value='manual'
                      checked={field.value === 'manual'}
                      onChange={field.onChange}
                      className='peer h-4 w-4 accent-primary text-primary focus:ring-primary border-gray-300 rounded'
                    />
                  </FormControl>
                  <FormLabel htmlFor='manual'>Manual</FormLabel>
                </div>
                <div className='flex items-center space-x-2'>
                  <FormControl>
                    <Input
                      type='radio'
                      id='automatic'
                      value='automatic'
                      checked={field.value === 'automatic'}
                      onChange={field.onChange}
                      className='peer h-4 w-4 accent-primary text-primary focus:ring-primary border-gray-300 rounded'
                    />
                  </FormControl>
                  <FormLabel htmlFor='automatic'>Automatic (+10%)</FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Course Description and Details */}
        <p>
          {currentCourse?.description}
          <br />
          <br />
          <div className='flex flex-col space-y-1'>
            <p>
              <b>Hours</b>: {currentCourse?.hours}
            </p>
            <p>
              <b>Deposit</b>: £{currentCourse?.deposit}
            </p>
          </div>
        </p>

        {/* Submit Button */}
        <Button type='submit'>Make a Deposit</Button>
      </form>
    </Form>
  );
}
