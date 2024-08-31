/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from '@/lib/supabase/client';
import { oneMonthAgoISOString } from '@/lib/utils';

import { toast } from '@/components/ui/use-toast';

import { ImageTypes } from '@/app/hooks/useImages';

export interface Product {
  id: number;
  created_at: string;
  image: string;
  name: string;
  price: string;
  description: string;
  link: string;
}

export interface NewProduct {
  name: string;
  price: string;
  description: string;
  link: string;
}

export const useProducts = () => {
  const supabase = createClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .gte('created_at', oneMonthAgoISOString)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setProducts(data || []);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: NewProduct) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('products')
        .insert([product]);

      if (insertError) {
        throw insertError;
      }

      await getProducts();
      toast({
        title: 'Success',
        description: 'Product added successfully!',
      });
    } catch (err) {
      setError('Failed to add product. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (id: number, product: NewProduct) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('products')
        .update(product)
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      await getProducts();
      toast({
        title: 'Success',
        description: 'Product updated successfully!',
      });
    } catch (err) {
      setError('Failed to update product. Please try again later.');
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number, image: string) => {
    if (!supabase.auth.getUser()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      await deleteImage(image);

      await getProducts();
      toast({
        title: 'Success',
        description: 'Product deleted successfully!',
      });
    } catch (err) {
      setError('Failed to delete product. Please try again later.');
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
    getProducts();
  }, []);

  const uploadImage = async (file: File | null, productId: number) => {
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
        .insert([{ image: filename, type: ImageTypes.PRODUCT }]);

      const { error: updateError } = await supabase
        .from('products')
        .update({ image: filename })
        .eq('id', productId);

      if (uploadError || insertError || updateError) {
        throw uploadError;
      }

      await getProducts();
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
    productId: number,
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
        .insert([{ image: filename, type: ImageTypes.PRODUCT }]);

      const { error: updateError } = await supabase
        .from('products')
        .update({ image: filename })
        .eq('id', productId);

      if (deleteError) throw deleteError;
      if (deleteStorageError) throw deleteStorageError;
      if (uploadError) throw uploadError;
      if (insertError) throw insertError;
      if (updateError) throw updateError;

      await getProducts();
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

      await getProducts();
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
    products,
    error,
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
    uploadImage,
    updateImage,
    deleteImage,
  };
};
