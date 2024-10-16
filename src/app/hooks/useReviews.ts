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
export interface NewReview {
  name: string;
  description: string;
  type: string;
}

export type PaginationType = 'infinite' | 'paged';
export type ReviewType = 'student' | 'instructor';

const LIMIT = 5; // Number of reviews per page

export const useReviews = (
  paginationType: PaginationType = 'infinite',
  reviewType?: ReviewType,
) => {
  const supabase = createClient();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchReviews = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      setPage(1);
      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select('*')
        // .textSearch('name', query, { type: 'websearch', config: 'english' });
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

      if (fetchError) throw fetchError;

      setReviews(data || []);
    } catch (err) {
      setError('Failed to search reviews. Please try again later.');
      toast({
        title: 'Error',
        description: String(err),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const from = (page - 1) * LIMIT;
      const to = page * LIMIT - 1;

      let query = supabase
        .from('reviews')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (reviewType) {
        query = query.eq('type', reviewType);
      }

      const { data, error: fetchError, count: totalCount } = await query;

      if (fetchError) throw fetchError;

      if (data) {
        if (paginationType === 'infinite') {
          // Infinite pagination: Only append reviews that haven't been loaded yet
          setReviews((prev) => {
            const newReviews = data.filter(
              (review) => !prev.some((r) => r.id === review.id),
            );
            return [...prev, ...newReviews];
          });
        } else {
          // Paged pagination: Replace the current reviews with new ones
          setReviews(data);
        }

        setHasMore(data.length === LIMIT); // Check if there are more reviews to load
      }

      if (totalCount !== null) setCount(totalCount);
    } catch (err) {
      setError('Failed to fetch reviews. Please try again later.');
      toast({
        title: 'Error',
        description: String(err),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMoreReviews = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchReviews(nextPage);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchReviews(prevPage);
    }
  };

  const addReview = async (review: NewReview) => {
    if (!supabase.auth.getUser()) return;

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('reviews')
        .insert([review]);

      if (insertError) throw insertError;

      toast({
        title: 'Success',
        description: 'Review added successfully!',
      });

      setPage(1); // Reset to first page
      fetchReviews(1);
    } catch (err) {
      setError('Failed to add review. Please try again later.');
      toast({
        title: 'Error',
        description: String(err),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: number) => {
    if (!supabase.auth.getUser()) return;

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      toast({
        title: 'Success',
        description: 'Review deleted successfully!',
      });

      setPage(1); // Reset to first page
      fetchReviews(1);
    } catch (err) {
      setError('Failed to delete review. Please try again later.');
      toast({
        title: 'Error',
        description: String(err),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(page); // Fetch reviews for the current page on mount or page change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return {
    loading,
    error,
    count,
    reviews,
    hasMore,
    page,
    loadMoreReviews,
    previousPage,
    addReview,
    deleteReview,
    searchReviews,
    fetchReviews,
  };
};
