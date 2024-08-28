import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

import { toast } from '@/components/ui/use-toast';

export interface Data {
  id: number;
  created_at: string;
  title: string;
  content: unknown;
}

export const useData = () => {
  const supabase = createClient();

  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('data')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setData(data || []);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (data: Data) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('data')
        .update(data)
        .eq('id', data.id);

      if (updateError) {
        throw updateError;
      }

      setData((prevData: Array<Data>) =>
        prevData.map((d: Data) => (d.id === data.id ? data : d)),
      );
    } catch (err) {
      setError('Failed to update data. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getDataById = (id: number): Data | undefined => {
    return data.find((d) => d.id === id) as Data;
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    getData,
    getDataById,
    updateData,
  };
};
