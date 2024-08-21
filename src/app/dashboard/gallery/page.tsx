'use client';
import { Plus } from 'lucide-react';
import React, { ChangeEvent } from 'react';

import { Gallery } from '@/components/Gallery';
import Spinner from '@/components/Spinner';

import { useImages } from '@/app/hooks/useImages';

export default function DashboardGalleryPage() {
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold text-dark mb-6'>Gallery</h1>
      <UploadImage />
    </div>
  );
}

function UploadImage() {
  const { loading, images, uploadImage, deleteImage } = useImages('gallery');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    uploadImage(file, 'gallery');
    e.target.value = ''; // Reset file input after upload
  };

  const handleDelete = (id: number, image: string) => {
    deleteImage(id, image);
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
        <div className='flex flex-col items-center'>
          <Plus className='text-gray-500' size={40} />
          <p className='mt-2 text-gray-500'>Drag & Drop or Click to Upload</p>
        </div>
      </div>
      {loading ? (
        <div className='flex items-center justify-center w-full mt-20'>
          <Spinner />
        </div>
      ) : (
        <Gallery images={images} onDelete={handleDelete} />
      )}
    </div>
  );
}
