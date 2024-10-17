/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from '@/lib/supabase/client';

import { toast } from '@/components/ui/use-toast';

import { ImageTypes } from '@/app/hooks/useImages';

export interface Course {
  id: number;
  created_at: string;
  image: string;
  title: string;
  hours: string;
  description: string;
  priceId: string;
  price: string;
  deposit: string;
  order: number;
}
export interface NewCourse {
  title: string;
  hours: string;
  description: string;
  priceId: string;
  price: string;
  deposit: string;
}

export const useCourses = () => {
  const supabase = createClient();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('courses')
        .select('*')
        .order('order', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setCourses(data || []);
    } catch (err) {
      setError('Failed to fetch courses. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to fetch courses. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (course: NewCourse) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('courses')
        .insert([course]);

      if (insertError) {
        throw insertError;
      }

      await getCourses();
      toast({
        title: 'Success',
        description: 'Course added successfully!',
      });
    } catch (err) {
      setError('Failed to add course. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to add course. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const editCourse = async (id: number, course: NewCourse) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('courses')
        .update(course)
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      await getCourses();
      toast({
        title: 'Success',
        description: 'Course updated successfully!',
      });
    } catch (err) {
      setError('Failed to update course. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to update course. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCourseOrder = async (updatedCourses: Course[]) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('courses')
        .upsert(updatedCourses, { onConflict: 'id' }); // Batch update course orders

      if (updateError) {
        throw updateError;
      }

      await getCourses(); // Refresh the courses list

      toast({
        title: 'Success',
        description: 'Course order updated successfully!',
      });
    } catch (err) {
      setError('Failed to update course order. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: number, image: string) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      await deleteImage(image);

      await getCourses();
      toast({
        title: 'Success',
        description: 'Course deleted successfully!',
      });
    } catch (err) {
      setError('Failed to delete course. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to delete course. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File | null, courseId: number) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    if (!file) {
      toast({
        title: 'Error',
        description: 'No file selected.',
        variant: 'destructive',
      });
      return;
    }

    const filename = `${uuidv4()}-${file.name}`;
    setLoading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filename, file);

      const { error: insertError } = await supabase
        .from('images')
        .insert([{ image: filename, type: ImageTypes.COURSE }]);

      const { error: updateError } = await supabase
        .from('courses')
        .update({ image: filename })
        .eq('id', courseId);

      if (uploadError || insertError || updateError) {
        throw uploadError;
      }

      await getCourses();
      toast({
        title: 'Success',
        description: 'Image uploaded successfully!',
      });
    } catch (err) {
      setError('Failed to upload image. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to upload image. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateImage = async (
    file: File | null,
    courseId: number,
    image: string,
  ) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteStorageError } = await supabase.storage
        .from('images')
        .remove([image]);

      const { error: deleteError } = await supabase
        .from('images')
        .delete()
        .eq('image', image);

      if (!file) {
        toast({
          title: 'Error',
          description: 'No file selected.',
          variant: 'destructive',
        });
        return;
      }

      const filename = `${uuidv4()}-${file.name}`;
      setLoading(true);

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filename, file);

      const { error: insertError } = await supabase
        .from('images')
        .insert([{ image: filename, type: ImageTypes.COURSE }]);

      const { error: updateError } = await supabase
        .from('courses')
        .update({ image: filename })
        .eq('id', courseId);

      if (deleteError) throw deleteError;
      if (deleteStorageError) throw deleteStorageError;
      if (uploadError) throw uploadError;
      if (insertError) throw insertError;
      if (updateError) throw updateError;

      await getCourses();
      toast({
        title: 'Success',
        description: 'Image updated successfully!',
      });
    } catch (err) {
      setError('Failed to update image. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to update image. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (image: string) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteStorageError } = await supabase.storage
        .from('images')
        .remove([image]);

      const { error: deleteError } = await supabase
        .from('images')
        .delete()
        .eq('image', image);

      if (deleteError || deleteStorageError) {
        throw deleteError;
      }

      await getCourses();
      toast({
        title: 'Success',
        description: 'Image deleted successfully!',
      });
    } catch (err) {
      setError('Failed to delete image. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to delete image. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return {
    loading,
    courses,
    error,
    getCourses,
    addCourse,
    editCourse,
    deleteCourse,
    uploadImage,
    updateImage,
    deleteImage,
    updateCourseOrder, // Expose the new function
  };
};
