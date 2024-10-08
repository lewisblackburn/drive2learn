/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

import { toast } from '@/components/ui/use-toast';

export interface Service {
  id: number;
  created_at: string;
  title: string;
  description: string;
  priceId: string;
  price: string;
  points: string;
  active: boolean;
}
export interface NewService {
  title: string;
  description: string;
  priceId: string;
  price: string;
  points: string;
  active: boolean;
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
        .order('id', { ascending: true });

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

  const deleteService = async (id: number) => {
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

  return {
    loading,
    services,
    error,
    getServices,
    addService,
    editService,
    deleteService,
  };
};
