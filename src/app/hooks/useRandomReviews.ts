import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

import { toast } from '@/components/ui/use-toast';

export interface Review {
  id: number;
  created_at: string;
  rating: number;
  name: string;
  description: string;
  type: string;
}

export type ReviewType = 'student' | 'instructor';

export const useRandomReviews = (reviewType?: ReviewType) => {
  const supabase = createClient();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomReviews = async (limit = 20) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (reviewType) {
        query = query.eq('type', reviewType);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      if (data) {
        setReviews(data);
      }
    } catch (err) {
      setError('Failed to fetch random reviews. Please try again later.');
      toast({
        title: 'Error',
        description: String(err),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshReviews = () => {
    getRandomReviews();
  };

  useEffect(() => {
    getRandomReviews();
  }, [reviewType]); // Refetch when reviewType changes

  return {
    reviews,
    loading,
    error,
    refreshReviews,
  };
};
