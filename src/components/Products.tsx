import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { Product, useProducts } from '@/app/hooks/useProducts';

function ProductCard({ product }: { product: Product }) {
  const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
    ? process.env.NEXT_PUBLIC_STORAGE_URL + product.image
    : '';

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
      <Image
        src={filepath}
        alt={product.name}
        className='object-cover w-full h-[300px] transition-all duration-200 hover:scale-105'
        width={400}
        height={300}
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-800'>{product.name}</h3>
        <div className='mt-2'>
          <span className='text-gray-900 font-bold'>{product.price}</span>
        </div>
        <p className='mt-2 text-sm text-gray-600 line-clamp-3'>
          {product.description}
        </p>
        <a href={product.link} target='_blank' rel='noopener noreferrer'>
          <Button className='mt-4 inline-block w-full text-center py-2 px-4'>
            Buy Now
          </Button>
        </a>
      </div>
    </div>
  );
}

export default function Products() {
  const { products } = useProducts();

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
