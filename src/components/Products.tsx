import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; // Import ShadCN UI Skeleton

import { Product, useProducts } from '@/app/hooks/useProducts';

function ProductCard({ product }: { product: Product }) {
  const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
    ? process.env.NEXT_PUBLIC_STORAGE_URL + product.image
    : '';

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden flex flex-col'>
      <Image
        src={filepath}
        alt={product.name}
        className='object-contain w-full h-[300px]'
        width={400}
        height={300}
      />
      <div className='p-4 flex flex-col flex-grow justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-gray-800'>
            {product.name}
          </h3>
          <div className='mt-2'>
            <span className='text-gray-900 font-bold'>{product.price}</span>
          </div>
          <p className='mt-2 text-sm text-gray-600 line-clamp-3'>
            {product.description}
          </p>
        </div>
        <a href={product.link} target='_blank' rel='noopener noreferrer'>
          <Button className='mt-4 inline-block w-full text-center py-2 px-4'>
            Find Out More
          </Button>
        </a>
      </div>
    </div>
  );
}

function ProductSkeletonCard() {
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden flex flex-col'>
      <Skeleton className='w-full h-[300px]' />
      <div className='p-4 flex flex-col flex-grow justify-between'>
        <div>
          <Skeleton className='h-6 w-3/4 mb-2' />
          <Skeleton className='h-6 w-1/3 mb-4' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6 mt-2' />
        </div>
        <Skeleton className='h-10 w-full mt-4' />
      </div>
    </div>
  );
}

export default function Products() {
  const { loading, products } = useProducts();

  if (loading) {
    return (
      <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Render Skeletons while loading */}
          <ProductSkeletonCard />
          <ProductSkeletonCard />
          <ProductSkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
