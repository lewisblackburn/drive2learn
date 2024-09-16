/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

import { toast } from '@/components/ui/use-toast';

export interface Review {
  id: number;
  created_at: string;
  rating: number;
  name: string;
  description: string;
}
export interface NewReview {
  name: string;
  description: string;
}

export const useReviews = () => {
  const supabase = createClient();

  const [count, setCount] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [topReviews, setTopReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTopReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      const { count: totalCount, error: countError } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true });

      if (fetchError || countError) {
        throw fetchError;
      }

      setTopReviews(data || []);
      setCount(totalCount || 0);
    } catch (err) {
      setError('Failed to fetch reviews. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setReviews(data || []);
    } catch (err) {
      setError('Failed to fetch reviews. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (review: NewReview) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('reviews')
        .insert([review]);

      if (insertError) {
        throw insertError;
      }

      await getReviews();
      toast({
        title: 'Success',
        description: 'Review added successfully!',
      });
    } catch (err) {
      setError('Failed to add review. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: number) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      await getReviews();
      toast({
        title: 'Success',
        description: 'Review deleted successfully!',
      });
    } catch (err) {
      setError('Failed to delete review. Please try again later.');
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
    getReviews();
  }, []);

  return {
    loading,
    reviews,
    topReviews,
    count,
    error,
    getReviews,
    getTopReviews,
    addReview,
    deleteReview,
  };
};
