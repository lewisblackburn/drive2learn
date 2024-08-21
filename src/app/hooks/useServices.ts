/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from '@/lib/supabase/client';
import { oneMonthAgoISOString } from '@/lib/utils';

import { toast } from '@/components/ui/use-toast';

import { ImageTypes } from '@/app/hooks/useImages';

export interface Service {
  id: number;
  created_at: string;
  image: string;
  title: string;
  hours: string;
  description: string;
  priceId: string;
  price: string;
  deposit: string;
}
export interface NewService {
  title: string;
  hours: string;
  description: string;
  priceId: string;
  price: string;
  deposit: string;
}

export const useServices = () => {
  const supabase = createClient();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getServices = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .gte('created_at', oneMonthAgoISOString)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setServices(data || []);
    } catch (err) {
      setError('Failed to fetch services. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: NewService) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('services')
        .insert([service]);

      if (insertError) {
        throw insertError;
      }

      await getServices();
      toast({
        title: 'Success',
        description: 'Service added successfully!',
      });
    } catch (err) {
      setError('Failed to add service. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const editService = async (id: number, service: NewService) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('services')
        .update(service)
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      await getServices();
      toast({
        title: 'Success',
        description: 'Service updated successfully!',
      });
    } catch (err) {
      setError('Failed to update service. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: number, image: string) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      await deleteImage(image);

      await getServices();
      toast({
        title: 'Success',
        description: 'Service deleted successfully!',
      });
    } catch (err) {
      setError('Failed to delete service. Please try again later.');
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
    getServices();
  }, []);

  const uploadImage = async (file: File | null, serviceId: number) => {
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
        .insert([{ image: filename, type: ImageTypes.SERVICE }]);

      const { error: updateError } = await supabase
        .from('services')
        .update({ image: filename })
        .eq('id', serviceId);

      if (uploadError || insertError || updateError) {
        throw uploadError;
      }

      await getServices();
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

  const updateImage = async (
    file: File | null,
    serviceId: number,
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
        .insert([{ image: filename, type: ImageTypes.SERVICE }]);

      const { error: updateError } = await supabase
        .from('services')
        .update({ image: filename })
        .eq('id', serviceId);

      if (deleteError) throw deleteError;
      if (deleteStorageError) throw deleteStorageError;
      if (uploadError) throw uploadError;
      if (insertError) throw insertError;
      if (updateError) throw updateError;

      await getServices();
      toast({
        title: 'Success',
        description: 'Image updated successfully!',
      });
    } catch (err) {
      setError('Failed to update image. Please try again later.');
      toast({
        title: 'Error',
        description: error,
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

      await getServices();
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

  return {
    loading,
    services,
    error,
    getServices,
    addService,
    editService,
    deleteService,
    uploadImage,
    updateImage,
    deleteImage,
  };
};
