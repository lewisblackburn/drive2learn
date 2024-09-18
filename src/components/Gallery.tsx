import { Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import NextImage from '@/components/NextImage';

import { Image as ImageType } from '@/app/hooks/useImages';
import { useSupabase } from '@/app/hooks/useSupabase';

interface GalleryProps {
  images: ImageType[];
  onDelete: (id: number, image: string) => void; // New prop for handling delete
  className?: string;
}

export const Gallery: React.FC<GalleryProps> = ({
  images,
  onDelete,
  className,
}) => {
  const { user } = useSupabase();
  const pathname = usePathname();

  const isOnDashboard = pathname === '/dashboard/gallery';

  const canDelete = user && isOnDashboard;

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2',
        className,
      )}
    >
      {images.map((image) => {
        const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
          ? process.env.NEXT_PUBLIC_STORAGE_URL + image.image
          : '';

        return (
          <div key={image.id} className={`relative ${user ? 'group' : ''}`}>
            <NextImage
              src={filepath}
              alt={`Image ${image.id}`}
              classNames={{
                image: `object-cover object-bottom w-full h-[500px] max-w-full rounded-lg transition-all duration-100 ${canDelete ? 'group-hover:brightness-[25%] cursor-pointer' : ''}`,
                blur: 'filter blur-sm',
              }}
              width={400}
              height={500}
              onClick={
                canDelete ? () => onDelete(image.id, image.image) : undefined
              }
            />
            {canDelete && (
              <button
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                onClick={(e) => {
                  if (canDelete) {
                    e.stopPropagation(); // Prevent image click event
                    onDelete(image.id, image.image);
                  }
                }}
              >
                <Trash2 className='w-full h-full' />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
