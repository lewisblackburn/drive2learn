import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface GalleryProps {
  images: { id: string; image: string }[];
  onImageClick?: (imagePath: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ images, onImageClick }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {images.map((image) => (
        <div
          key={image.id}
          className={`relative ${onImageClick ? 'group' : ''}`}
        >
          <Image
            src={image.image}
            alt={`Image ${image.id}`}
            className={`object-cover object-bottom w-full h-[500px] max-w-full rounded-lg transition-all duration-100 ${onImageClick ? 'group-hover:brightness-[25%]' : ''}`}
            width={400}
            height={500}
            onClick={onImageClick ? () => onImageClick(image.image) : undefined}
          />
          {onImageClick && (
            <button
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
              onClick={(e) => {
                e.stopPropagation(); // Prevents click event from firing twice
                onImageClick(image.image);
              }}
            >
              <Trash2 className='w-full h-full' />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
