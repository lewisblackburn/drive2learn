/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from '@/lib/supabase/client';

import { toast } from '@/components/ui/use-toast';

import { ImageTypes } from '@/app/hooks/useImages';

export interface Community {
  id: number;
  created_at: string;
  image: string;
  title: string;
  description: string;
}
export interface NewCommunity {
  title: string;
  description: string;
}

export const useCommunity = () => {
  const supabase = createClient();

  const [data, setData] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCommunity = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('community')
        .select('*')
        .order('order', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setData(data || []);
    } catch (err) {
      setError('Failed to fetch community data. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addCommunity = async (community: NewCommunity) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('community')
        .insert([community]);

      if (insertError) {
        throw insertError;
      }

      await getCommunity();
      toast({
        title: 'Success',
        description: 'Community added successfully!',
      });
    } catch (err) {
      setError('Failed to add community. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const editCommunity = async (id: number, community: NewCommunity) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('community')
        .update(community)
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      await getCommunity();
      toast({
        title: 'Success',
        description: 'Community updated successfully!',
      });
    } catch (err) {
      setError('Failed to update community. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCommunityOrder = async (updatedCommunity: Community[]) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('community')
        .upsert(updatedCommunity, { onConflict: 'id' });

      if (updateError) {
        throw updateError;
      }

      await getCommunity();
      toast({
        title: 'Success',
        description: 'Community order updated successfully!',
      });
    } catch (err) {
      setError('Failed to update community order. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCommunity = async (id: number, image: string) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('community')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      await deleteImage(image);

      await getCommunity();
      toast({
        title: 'Success',
        description: 'Community deleted successfully!',
      });
    } catch (err) {
      setError('Failed to delete community. Please try again later.');
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
    getCommunity();
  }, []);

  const uploadImage = async (file: File | null, communityId: number) => {
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
        .insert([{ image: filename, type: ImageTypes.COMMUNITY }]);

      const { error: updateError } = await supabase
        .from('community')
        .update({ image: filename })
        .eq('id', communityId);

      if (uploadError || insertError || updateError) {
        throw uploadError;
      }

      await getCommunity();
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
    communityId: number,
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
        .insert([{ image: filename, type: ImageTypes.COMMUNITY }]);

      const { error: updateError } = await supabase
        .from('community')
        .update({ image: filename })
        .eq('id', communityId);

      if (deleteError) throw deleteError;
      if (deleteStorageError) throw deleteStorageError;
      if (uploadError) throw uploadError;
      if (insertError) throw insertError;
      if (updateError) throw updateError;

      await getCommunity();
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

      await getCommunity();
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
    data,
    error,
    getCommunity,
    addCommunity,
    editCommunity,
    updateCommunityOrder,
    deleteCommunity,
    uploadImage,
    updateImage,
    deleteImage,
  };
};
