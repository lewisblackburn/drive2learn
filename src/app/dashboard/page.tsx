'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';

import { useImages } from '@/app/hooks/useImages';

export default function Dashboard() {
  return (
    <div>
      <h1 className='mb-6 text-xl font-bold leading-[1.208] text-dark sm:text-2xl md:text-3xl'>
        Dashboard
      </h1>
      <div className='flex flex-col space-y-5 lg:space-x-5 lg:flex-row lg:space-y-0'>
        <UploadMapImage />
      </div>
    </div>
  );
}

const UploadMapImage = () => {
  const { images, uploadImage, deleteImage } = useImages('map');

  const currentImage = images.length > 0 ? images[0] : null;

  const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
    ? process.env.NEXT_PUBLIC_STORAGE_URL + currentImage?.image
    : '';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];

      // Automatically upload the image
      await handleUpload(newFile);
    }
  };

  const handleUpload = async (newFile: File) => {
    if (!newFile) {
      return;
    }

    // Remove the current image if it exists
    if (currentImage) {
      await deleteImage(currentImage.id, currentImage.image); // Assuming images have an 'id' property
    }

    // Upload the new image
    await uploadImage(newFile, 'map');
  };

  return (
    <Card className='w-full lg:max-w-xs' x-chunk='charts-01-chunk-7'>
      <CardHeader className='space-y-0 pb-0'>
        <CardDescription>Upload Map Image</CardDescription>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='flex flex-col items-center space-y-2 p-4'>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
          <div
            className='w-full h-60 bg-contain bg-no-repeat bg-center cursor-pointer'
            style={{ backgroundImage: `url(${filepath ?? '/images/map.png'})` }}
            onClick={() =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              document.querySelector('input[type="file"]')?.click()
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
