'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import { Plus } from 'lucide-react';
import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import NextImage from '@/components/NextImage';
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
  description: z.string(),
  link: z.string().url(),
});

export const ProductCards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const {
    products,
    editProduct,
    updateProductOrder,
    addProduct,
    deleteProduct,
    updateImage,
  } = useProducts();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const updateProductOrderInDatabase = useCallback(
    (updatedProducts: Product[]) => {
      debounce(() => updateProductOrder(updatedProducts), 300)();
    },
    [updateProductOrder],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = productList.findIndex(
      (product) => product.id === active.id,
    );
    const newIndex = productList.findIndex((product) => product.id === over.id);

    const newProductList = arrayMove(productList, oldIndex, newIndex).map(
      (product, index) => ({
        ...product,
        order: index, // Update order
      }),
    );

    setProductList(newProductList); // Update the state immediately for a smoother UX
    updateProductOrderInDatabase(newProductList); // Debounce the database update
  };

  useEffect(() => {
    if (products) {
      setProductList(products);
    }
  }, [products]);

  const methods = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: selectedProduct?.name ?? '',
      description: selectedProduct?.description ?? '',
      link: selectedProduct?.link ?? '',
    },
  });

  useEffect(() => {
    methods.reset({
      name: selectedProduct?.name ?? '',
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

  return (
    <>
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={productList.map((product) => product.id)}
          strategy={rectSortingStrategy}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div
              className='bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-[500px] flex flex-col'
              onClick={() => {
                addProduct({
                  name: 'New Product',
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
            {productList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsDialogOpen(true);
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, onClick }, ref) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: product.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
      ? process.env.NEXT_PUBLIC_STORAGE_URL + product.image
      : '';

    return (
      <div
        ref={(node) => {
          setNodeRef(node);
          if (ref && 'current' in ref) ref.current = node;
        }}
        style={style}
        {...attributes}
        {...listeners}
        className='bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[500px] cursor-pointer'
        onClick={onClick}
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
          </div>
        </div>
      </div>
    );
  },
);
