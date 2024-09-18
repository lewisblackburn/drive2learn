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

import { TeamMember, useTeam } from '@/app/hooks/useTeam';

const editTeamMemberSchema = z.object({
  name: z.string(),
  job_type: z.string(),
  quote: z.string(),
});

export const TeamCards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] =
    useState<TeamMember | null>(null);
  const {
    loading,
    team,
    editTeamMember,
    addTeamMember,
    deleteTeamMember,
    updateImage,
  } = useTeam();

  const methods = useForm<z.infer<typeof editTeamMemberSchema>>({
    resolver: zodResolver(editTeamMemberSchema),
    defaultValues: {
      name: selectedTeamMember?.name ?? '',
      job_type: selectedTeamMember?.job_type ?? '',
      quote: selectedTeamMember?.quote ?? '',
    },
  });

  useEffect(() => {
    methods.reset({
      name: selectedTeamMember?.name ?? '',
      job_type: selectedTeamMember?.job_type ?? '',
      quote: selectedTeamMember?.quote ?? '',
    });
  }, [selectedTeamMember, methods]);

  function onSubmit(values: z.infer<typeof editTeamMemberSchema>) {
    if (!selectedTeamMember) return;
    editTeamMember(selectedTeamMember.id, values);
    setIsDialogOpen(false);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    updateImage(
      file,
      selectedTeamMember?.id ?? -1,
      selectedTeamMember?.image ?? '',
    );
    e.target.value = ''; // Reset file input after upload
    setSelectedTeamMember(null);
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
            <SheetTitle>{selectedTeamMember?.name}</SheetTitle>
            <SheetDescription>{selectedTeamMember?.job_type}</SheetDescription>
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
                      Enter the team member's name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='job_type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Specify the job type of the team member
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name='quote'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quote</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a quote from the team member
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-between w-full'>
                <Button
                  autoFocus={false}
                  onClick={() => {
                    selectedTeamMember &&
                      deleteTeamMember(
                        selectedTeamMember.id,
                        selectedTeamMember.image,
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
      <div
        className='bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer min-h-[350px] flex flex-col'
        onClick={() => {
          addTeamMember({
            name: 'New Member',
            job_type: 'New Job Type',
            quote: 'New Quote',
          });
        }}
      >
        <div className='flex-grow'>
          <div className='flex items-center justify-center w-full h-full object-cover'>
            <Plus />
          </div>
        </div>
      </div>
      {team.map((member) => {
        const filepath = process.env.NEXT_PUBLIC_STORAGE_URL
          ? process.env.NEXT_PUBLIC_STORAGE_URL + member.image
          : '';

        return (
          <div
            key={member.id}
            className='bg-white rounded-lg shadow-lg overflow-hidden flex flex-col min-h-[350px] cursor-pointer'
            onClick={() => {
              setSelectedTeamMember(member);
              setIsDialogOpen(true);
            }}
          >
            <div className='w-full h-48 relative'>
              <NextImage
                src={filepath}
                alt={member.name}
                layout='fill'
                fill
                classNames={{ image: 'w-full h-48 object-contain' }}
              />
            </div>
            <div className='flex-grow p-6 text-start'>
              <h2 className='text-xl font-bold mb-2'>{member.name}</h2>
              <p className='text-gray-700 mb-4'>{member.job_type}</p>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-gray-600 italic'>"{member.quote}"</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
