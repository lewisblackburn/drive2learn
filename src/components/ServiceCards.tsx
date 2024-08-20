/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';

// Define a TypeScript interface for the Service object
interface Service {
  id: string;
  title: string;
  description: string;
  hours: string;
  deposit: string;
  price: string;
  image: string;
}

export const ServiceCards = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hours: '',
    deposit: '',
    price: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data.services);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      hours: service.hours,
      deposit: service.deposit,
      price: service.price,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingService) return; // Ensure editingService is defined
    try {
      const response = await fetch('/api/services/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingService.id, // Include the ID to specify which service to update
          newData: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update service');
      }

      setServices((prev) =>
        prev.map((service) =>
          service.id === editingService.id
            ? { ...service, ...formData }
            : service,
        ),
      );
      toast({
        title: 'Success',
        description: 'Service updated successfully',
        variant: 'default',
      });
      setEditingService(null); // Close the form
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading)
    return (
      <div className='flex items-center justify-center w-full mt-20'>
        <Spinner />
      </div>
    );

  if (error) {
    toast({
      title: 'Error',
      description: error,
      variant: 'destructive',
    });
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {services.map((service) => (
        <Sheet key={service.id}>
          <SheetTrigger>
            <div
              className='bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer'
              onClick={() => handleEditClick(service)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-6 text-start'>
                <h2 className='text-xl font-bold mb-2'>{service.title}</h2>
                <p className='text-gray-700 mb-4'>{service.description}</p>
                <div className='flex justify-between items-center mb-4'>
                  <span className='text-gray-600'>{service.hours}</span>
                  <span className='text-gray-600'>
                    Deposit: {service.deposit}
                  </span>
                </div>
                <div className='text-right'>
                  <span className='text-xl font-semibold text-primary'>
                    {service.price}
                  </span>
                </div>
              </div>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{service.title}</SheetTitle>
              <SheetDescription>
                <p>{service.description}</p>
              </SheetDescription>
            </SheetHeader>
            {editingService?.id === service.id && (
              <form onSubmit={handleSubmit} className='p-4'>
                <input type='hidden' name='id' value={editingService.id} />
                <div className='mb-4'>
                  <label
                    htmlFor='title'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Title
                  </label>
                  <input
                    type='text'
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='description'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Description
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='hours'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Hours
                  </label>
                  <input
                    type='text'
                    id='hours'
                    name='hours'
                    value={formData.hours}
                    onChange={handleChange}
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='deposit'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Deposit
                  </label>
                  <input
                    type='text'
                    id='deposit'
                    name='deposit'
                    value={formData.deposit}
                    onChange={handleChange}
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='price'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Price
                  </label>
                  <input
                    type='text'
                    id='price'
                    name='price'
                    value={formData.price}
                    onChange={handleChange}
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                  />
                </div>
                <div className='flex justify-end'>
                  <Button type='submit'>Update Service</Button>
                </div>
              </form>
            )}
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
};
