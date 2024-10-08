'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import NextImage from '@/components/NextImage';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';

import { Product, useProducts } from '@/app/hooks/useProducts';

const editProductSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
  link: z.string().url(),
});

export const ProductCards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    loading,
    products,
    editProduct,
    addProduct,
    deleteProduct,
    updateImage,
  } = useProducts();

  const methods = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: selectedProduct?.name ?? '',
      price: selectedProduct?.price ?? '0',
      description: selectedProduct?.description ?? '',
      link: selectedProduct?.link ?? '',
    },
  });

  useEffect(() => {
    methods.reset({
      name: selectedProduct?.name ?? '',
      price: selectedProduct?.price ?? '0',
      description: selectedProduct?.description ?? '',
      link: selectedProduct?.link ?? '',
    });
  }, [selectedProduct, methods]);

  function onSubmit(values: z.infer<typeof editProductSchema>) {
    if (!selectedProduct) return;
    editProduct(selectedProduct.id, values);
    setIsDialogOpen(false);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    updateImage(file, selectedProduct?.id ?? -1, selectedProduct?.image ?? '');
    e.target.value = ''; // Reset file input after upload
    setSelectedProduct(null);
    setIsDialogOpen(false);
  };

  if (loading)
    return (
      <div className='flex items-center justify-center w-full mt-20'>
        <Spinner />
      </div>
    );

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <SheetContent className='overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>{selectedProduct?.name}</SheetTitle>
            <SheetDescription>{selectedProduct?.description}</SheetDescription>
          </SheetHeader>
          <div className='relative flex items-center justify-center p-4 border border-gray-300 rounded-lg bg-gray-50 my-6'>
            <input
              type='file'
              accept='image/*'
              onChange={handleChange}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            />
            <div className='flex flex-col items-center'>
              <Plus className='text-gray-500' size={40} />
              <p className='mt-2 text-gray-500'>
                Drag & Drop or Click to Upload
              </p>
            </div>
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <FormField
                control={methods.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the name of the product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Specify the price of the product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of the product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='link'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Link</FormLabel>
                    <FormControl>
                      <Input {...field} type='url' />
                    </FormControl>
                    <FormDescription>
                      Enter the URL link to the product page
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-between w-full'>
                <Button
                  autoFocus={false}
                  onClick={() => {
                    selectedProduct &&
                      deleteProduct(selectedProduct.id, selectedProduct.image);
                    setIsDialogOpen(false);
                  }}
                  variant='destructive'
                  type='button'
                >
                  Delete
                </Button>
                <Button type='submit'>Submit</Button>
              </div>
            </form>
          </FormProvider>
        </SheetContent>
      </Sheet>
      <div
        className='bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-[500px] flex flex-col'
        onClick={() => {
          addProduct({
            name: 'New Product',
            price: '0',
            description: 'New Description',
            link: 'https://example.com',
          });
        }}
      >
        <div className='flex-grow'>
          <div className='flex items-center justify-center w-full h-full object-cover'>
            <Plus />
          </div>
        </div>
      </div>
      {products.map((product) => {
        const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
          ? process.env.NEXT_PUBLIC_STORAGE_URL + product.image
          : '';

        return (
          <div
            key={product.id}
            className='bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[500px] cursor-pointer'
            onClick={() => {
              setSelectedProduct(product);
              setIsDialogOpen(true);
            }}
          >
            <div className='w-full h-48 relative'>
              <NextImage
                src={filepath}
                alt={product.name}
                layout='fill'
                fill
                classNames={{ image: 'w-full h-48 object-contain' }}
              />
            </div>
            <div className='flex-grow p-6 text-start'>
              <h2 className='text-xl font-bold mb-2'>{product.name}</h2>
              <p className='text-gray-700 mb-4 line-clamp-3'>
                {product.description}
              </p>
            </div>
            <div className='p-6 border-t border-gray-200'>
              <div className='flex items-center justify-between'>
                <a
                  href={product.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary underline'
                >
                  View Product
                </a>
                <span className='text-xl font-semibold text-primary'>
                  £{parseInt(product.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
