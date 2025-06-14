import { useCallback, useEffect, useState } from 'react';

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

  const getRandomReviews = useCallback(
    async (limit = 20) => {
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
          const randomizedReviews = [...data];
          for (let i = randomizedReviews.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedReviews[i], randomizedReviews[j]] = [
              randomizedReviews[j],
              randomizedReviews[i],
            ];
          }
          setReviews(randomizedReviews);
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
    },
    [reviewType, supabase],
  );

  const refreshReviews = useCallback(() => {
    getRandomReviews();
  }, [getRandomReviews]);

  useEffect(() => {
    getRandomReviews();
  }, [getRandomReviews]);

  return {
    reviews,
    loading,
    error,
    refreshReviews,
  };
};
