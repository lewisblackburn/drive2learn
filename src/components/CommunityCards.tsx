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

import { Community, useCommunity } from '@/app/hooks/useCommunity';

const editCommunitySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const CommunityCards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null,
  );
  const [communityList, setCommunityList] = useState<Community[]>([]);
  const {
    data: communities,
    editCommunity,
    updateCommunityOrder,
    addCommunity,
    deleteCommunity,
    updateImage,
  } = useCommunity();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const updateCommunityOrderInDatabase = useCallback(
    debounce((updatedCommunities: Community[]) => {
      updateCommunityOrder(updatedCommunities);
    }, 300),
    [],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = communityList.findIndex(
      (community) => community.id === active.id,
    );
    const newIndex = communityList.findIndex(
      (community) => community.id === over.id,
    );

    const newCommunityList = arrayMove(communityList, oldIndex, newIndex).map(
      (community, index) => ({
        ...community,
        order: index, // Update order
      }),
    );

    setCommunityList(newCommunityList); // Update the state immediately for a smoother UX
    updateCommunityOrderInDatabase(newCommunityList); // Debounce the database update
  };

  useEffect(() => {
    if (communities) {
      setCommunityList(communities);
    }
  }, [communities]);

  const methods = useForm<z.infer<typeof editCommunitySchema>>({
    resolver: zodResolver(editCommunitySchema),
    defaultValues: {
      title: selectedCommunity?.title ?? '',
      description: selectedCommunity?.description ?? '',
    },
  });

  useEffect(() => {
    methods.reset({
      title: selectedCommunity?.title ?? '',
      description: selectedCommunity?.description ?? '',
    });
  }, [selectedCommunity, methods]);

  function onSubmit(values: z.infer<typeof editCommunitySchema>) {
    if (!selectedCommunity) return;
    editCommunity(selectedCommunity.id, values);
    setIsDialogOpen(false);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    updateImage(
      file,
      selectedCommunity?.id ?? -1,
      selectedCommunity?.image ?? '',
    );
    e.target.value = ''; // Reset file input after upload
    setSelectedCommunity(null);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <SheetContent className='overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>{selectedCommunity?.title}</SheetTitle>
            <SheetDescription>
              {selectedCommunity?.description}
            </SheetDescription>
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
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the title of the community
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
                      Provide a detailed description of the community
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-between w-full'>
                <Button
                  autoFocus={false}
                  onClick={() => {
                    selectedCommunity &&
                      deleteCommunity(
                        selectedCommunity.id,
                        selectedCommunity.image,
                      );
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
          items={communityList.map((community) => community.id)}
          strategy={rectSortingStrategy}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div
              className='bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-[500px] flex flex-col'
              onClick={() => {
                addCommunity({
                  title: 'New Community',
                  description: 'New Description',
                });
              }}
            >
              <div className='flex-grow'>
                <div className='flex items-center justify-center w-full h-full object-cover'>
                  <Plus />
                </div>
              </div>
            </div>
            {communityList.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                onClick={() => {
                  setSelectedCommunity(community);
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

interface CommunityCardProps {
  community: Community;
  onClick: () => void;
}

export const CommunityCard = forwardRef<HTMLDivElement, CommunityCardProps>(
  ({ community, onClick }, ref) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: community.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
      ? process.env.NEXT_PUBLIC_STORAGE_URL + community.image
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
            alt={community.title}
            layout='fill'
            fill
            classNames={{ image: 'w-full h-48 object-cover' }}
          />
        </div>
        <div className='flex-grow p-6 text-start'>
          <h2 className='text-xl font-bold mb-2'>{community.title}</h2>
          <p className='text-gray-700 mb-4'>{community.description}</p>
        </div>
      </div>
    );
  },
);
