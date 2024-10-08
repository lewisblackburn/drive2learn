/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from '@/lib/supabase/client';

import { toast } from '@/components/ui/use-toast';

export interface Image {
  id: number;
  created_at: string;
  image: string;
}
export interface NewImage {
  image: string;
}

export const ImageTypes = {
  GALLERY: 'gallery',
  COURSE: 'course',
  SERVICE: 'service',
  TEAM: 'team',
  PRODUCT: 'product',
  MAP: 'map',
  COMMUNITY: 'community',
};
export type ImageType = (typeof ImageTypes)[keyof typeof ImageTypes];

export const useImages = (type: ImageType) => {
  const supabase = createClient();

  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getImages = async (type: ImageType) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('images')
        .select('*')
        .eq('type', type ?? 'gallery')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setImages(data || []);
    } catch (err) {
      setError('Failed to fetch images. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File | null, type: ImageType) => {
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
      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filename, file);

      const { error: insertError } = await supabase
        .from('images')
        .insert([{ image: filename, type: type }]);

      if (uploadError || insertError) {
        throw uploadError;
      }

      await getImages(type);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully!',
      });
    } catch (err) {
      setError('Failed to upload image. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: number, image: string) => {
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
        .eq('id', id);

      if (deleteError || deleteStorageError) {
        throw deleteError;
      }

      await getImages(type);
      toast({
        title: 'Success',
        description: 'Image deleted successfully!',
      });
    } catch (err) {
      setError('Failed to delete image. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getImages(type);
  }, []);

  return {
    loading,
    images,
    error,
    getImages,
    setImages,
    uploadImage,
    deleteImage,
  };
};
