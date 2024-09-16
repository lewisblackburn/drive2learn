/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from '@/lib/supabase/client';

import { toast } from '@/components/ui/use-toast';

import { ImageTypes } from '@/app/hooks/useImages';

export interface TeamMember {
  id: number;
  name: string;
  job_type: string;
  quote: string;
  image: string;
}
export interface NewTeamMember {
  name: string;
  job_type: string;
  quote: string;
}

export const useTeam = () => {
  const supabase = createClient();

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTeam = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('team')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setTeam(data || []);
    } catch (err) {
      setError('Failed to fetch team. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addTeamMember = async (teamMember: NewTeamMember) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('team')
        .insert([teamMember]);

      if (insertError) {
        throw insertError;
      }

      await getTeam();
      toast({
        title: 'Success',
        description: 'Team member added successfully!',
      });
    } catch (err) {
      setError('Failed to add team. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const editTeamMember = async (id: number, teamMember: NewTeamMember) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('team')
        .update(teamMember)
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      await getTeam();
      toast({
        title: 'Success',
        description: 'Team member updated successfully!',
      });
    } catch (err) {
      setError('Failed to update team member. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTeamMember = async (id: number, image: string) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('team')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      await deleteImage(image);

      await getTeam();
      toast({
        title: 'Success',
        description: 'Team member deleted successfully!',
      });
    } catch (err) {
      setError('Failed to delete team member. Please try again later.');
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
    getTeam();
  }, []);

  const uploadImage = async (file: File | null, teamMemberId: number) => {
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
        .insert([{ image: filename, type: ImageTypes.TEAM }]);

      const { error: updateError } = await supabase
        .from('team')
        .update({ image: filename })
        .eq('id', teamMemberId);

      if (uploadError || insertError || updateError) {
        throw uploadError;
      }

      await getTeam();
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
    teamMemberId: number,
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
        .insert([{ image: filename, type: ImageTypes.TEAM }]);

      const { error: updateError } = await supabase
        .from('team')
        .update({ image: filename })
        .eq('id', teamMemberId);

      if (deleteError) throw deleteError;
      if (deleteStorageError) throw deleteStorageError;
      if (uploadError) throw uploadError;
      if (insertError) throw insertError;
      if (updateError) throw updateError;

      await getTeam();
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

      await getTeam();
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
    team,
    error,
    getTeam,
    addTeamMember,
    editTeamMember,
    deleteTeamMember,
    uploadImage,
    updateImage,
    deleteImage,
  };
};
