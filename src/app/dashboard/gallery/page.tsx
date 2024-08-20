'use client';
import { Plus } from 'lucide-react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from '@/lib/supabase/client';

import { Gallery } from '@/components/Gallery';
import Spinner from '@/components/Spinner';
import { toast } from '@/components/ui/use-toast';

export default function DashboardGalleryPage() {
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold text-dark mb-6'>Gallery</h1>
      <UploadImage />
    </div>
  );
}

function UploadImage() {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages] = useState<any[]>([]);

  // Function to fetch images from Supabase
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setImages(data || []);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const handleFileUpload = async (file: File | null) => {
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
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const filepath = process.env.NEXT_PUBLIC_STORAGE_URL + data?.path;

      // Insert file path into the database
      const { error: insertError } = await supabase
        .from('images')
        .insert({ image: filepath });

      if (insertError) throw insertError;

      // Fetch updated list of images
      await fetchImages();

      toast({ title: 'Success', description: 'Image uploaded successfully!' });
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleFileUpload(file);
    e.target.value = ''; // Reset file input after upload
  };

  const handleImageClick = async (imagePath: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    setLoading(true);

    try {
      // Delete the file from Supabase storage
      const { error: deleteError } = await supabase.storage
        .from('images')
        .remove([imagePath]);

      if (deleteError) throw deleteError;

      // Delete the record from the database
      const { error: deleteRecordError } = await supabase
        .from('images')
        .delete()
        .eq('image', imagePath);

      if (deleteRecordError) throw deleteRecordError;

      // Fetch updated list of images
      await fetchImages();

      toast({ title: 'Success', description: 'Image deleted successfully!' });
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='relative flex items-center justify-center p-4 border border-gray-300 rounded-lg bg-gray-50 mb-6'>
        <input
          type='file'
          accept='image/*'
          onChange={handleChange}
          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
        />
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col items-center'>
            <Plus className='text-gray-500' size={40} />
            <p className='mt-2 text-gray-500'>Drag & Drop or Click to Upload</p>
          </div>
        )}
      </div>
      <Gallery images={images} onImageClick={handleImageClick} />
    </div>
  );
}
