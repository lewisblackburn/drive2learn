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
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

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

import { Service, useServices } from '@/app/hooks/useServices';

const editServiceSchema = z.object({
  title: z.string(),
  description: z.string(),
  priceId: z.string(),
  price: z.string(),
  points: z.string(),
});

export const ServiceEditCards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const {
    services,
    editService,
    addService,
    deleteService,
    updateServiceOrder,
  } = useServices();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const updateServiceOrderInDatabase = useCallback(
    (updatedServices: Service[]) => {
      debounce(() => updateServiceOrder(updatedServices), 300)();
    },
    [updateServiceOrder],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = serviceList.findIndex(
      (service) => service.id === active.id,
    );
    const newIndex = serviceList.findIndex((service) => service.id === over.id);

    const newServiceList = arrayMove(serviceList, oldIndex, newIndex).map(
      (service, index) => ({
        ...service,
        order: index, // Update order
      }),
    );

    setServiceList(newServiceList); // Update the state immediately for a smoother UX
    updateServiceOrderInDatabase(newServiceList); // Debounce the database update
  };

  useEffect(() => {
    if (services) {
      setServiceList(services);
    }
  }, [services]);

  const methods = useForm<z.infer<typeof editServiceSchema>>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      title: selectedService?.title ?? '',
      description: selectedService?.description ?? '',
      priceId: selectedService?.priceId ?? '',
      price: selectedService?.price ?? '',
      points: selectedService?.points ?? '',
    },
  });

  useEffect(() => {
    methods.reset({
      title: selectedService?.title ?? '',
      description: selectedService?.description ?? '',
      priceId: selectedService?.priceId ?? '',
      price: selectedService?.price ?? '',
      points: selectedService?.points ?? '',
    });
  }, [selectedService, methods]);

  function onSubmit(values: z.infer<typeof editServiceSchema>) {
    if (!selectedService) return;
    editService(selectedService.id, values);
    setIsDialogOpen(false);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={serviceList.map((service) => service.id)}
        strategy={rectSortingStrategy}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetContent className='overflow-y-scroll'>
              <SheetHeader>
                <SheetTitle>{selectedService?.title}</SheetTitle>
                <SheetDescription>
                  {selectedService?.description}
                </SheetDescription>
              </SheetHeader>
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className='space-y-8'
                >
                  <FormField
                    control={methods.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the title of the service
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
                          Provide a detailed description of the service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name='priceId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the Stripe price ID for the service
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
                          Specify the price of the service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name='points'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Points</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Specify the points for the service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex items-center justify-between w-full'>
                    <Button
                      autoFocus={false}
                      onClick={() => {
                        selectedService && deleteService(selectedService.id);
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
            className='bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-[350px] flex flex-col'
            onClick={() => {
              addService({
                title: 'New Service',
                description: 'New Description',
                priceId: 'New Price ID',
                price: 'New Price',
                points: 'Point 1, Point 2, Point 3, Point 4',
              });
            }}
          >
            <div className='flex-grow'>
              <div className='flex items-center justify-center w-full h-full object-cover'>
                <Plus />
              </div>
            </div>
          </div>
          {serviceList.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => {
                setSelectedService(service);
                setIsDialogOpen(true);
              }}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

const ServiceCard = ({ service, onClick }: ServiceCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: service.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[350px] cursor-pointer'
      onClick={onClick}
    >
      <div className='flex-grow p-6 text-start'>
        <h2 className='text-xl font-bold mb-2'>{service.title}</h2>
        <p className='text-gray-700 mb-4'>{service.description}</p>
      </div>
      <div className='p-6 border-t border-gray-200'>
        <div className='flex items-center justify-between'>
          <span></span>
          <span className='text-xl font-semibold text-primary'>
            {service.price}
          </span>
        </div>
      </div>
    </div>
  );
};
