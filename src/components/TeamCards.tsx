/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface TeamMember {
  id: string;
  name: string;
  job_type: string;
  quote: string;
  image: string;
}

const getRandomTeamMember = (): TeamMember => {
  return {
    id: Math.random().toString(36).substr(2, 9), // Generating a random ID
    name: `Member ${Math.floor(Math.random() * 100)}`,
    job_type: `Job Type ${Math.floor(Math.random() * 10)}`,
    quote: `This is a random quote ${Math.floor(Math.random() * 100)}`,
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  };
};

export const TeamCards = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    job_type: '',
    quote: '',
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch('/api/team');
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setTeam(data.team);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const handleEditClick = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      job_type: member.job_type,
      quote: member.quote,
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
    if (!editingMember) return; // Ensure editingMember is defined
    try {
      const response = await fetch('/api/team/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingMember.id, // Include the ID to specify which member to update
          newData: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update team member');
      }

      setTeam((prev) =>
        prev.map((member) =>
          member.id === editingMember.id ? { ...member, ...formData } : member,
        ),
      );
      toast({
        title: 'Success',
        description: 'Team member updated successfully',
        variant: 'default',
      });
      setEditingMember(null); // Close the form
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleAddMember = async () => {
    const newMember = getRandomTeamMember();
    try {
      const response = await fetch('/api/team/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember), // Ensure the body is JSON
      });

      if (!response.ok) {
        throw new Error('Failed to add new team member');
      }

      // Trigger a page reload to fetch and display the updated team list
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/team/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete team member');
      }

      setTeam((prev) => prev.filter((member) => member.id !== id));
      toast({
        title: 'Success',
        description: 'Team member deleted successfully',
        variant: 'default',
      });
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
    <div>
      <div className='flex justify-end mb-4'>
        <Button onClick={handleAddMember}>Add New Member</Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {team.map((member) => (
          <Sheet key={member.id}>
            <SheetTrigger>
              <div
                className='bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer'
                onClick={() => handleEditClick(member)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className='w-full h-48 object-contain'
                />
                <div className='p-6 text-start'>
                  <h2 className='text-xl font-bold mb-2'>{member.name}</h2>
                  <p className='text-gray-700 mb-4'>{member.job_type}</p>
                  <div className='text-gray-600'>
                    <span>{member.quote}</span>
                  </div>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent className='flex flex-col h-full'>
              <div className='flex-1'>
                <SheetHeader>
                  <SheetTitle>{member.name}</SheetTitle>
                  <SheetDescription>
                    <p>{member.job_type}</p>
                  </SheetDescription>
                </SheetHeader>
                {editingMember?.id === member.id && (
                  <form onSubmit={handleSubmit} className='p-4 space-y-4'>
                    <input type='hidden' name='id' value={editingMember.id} />
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Name
                      </label>
                      <Input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='job_type'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Job Type
                      </label>
                      <Input
                        type='text'
                        id='job_type'
                        name='job_type'
                        value={formData.job_type}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='quote'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Quote
                      </label>
                      <Textarea
                        id='quote'
                        name='quote'
                        value={formData.quote}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                    <div className='flex justify-end'>
                      <Button type='submit'>Update Member</Button>
                    </div>
                  </form>
                )}
              </div>
              <div className='mt-auto flex justify-end my-4'>
                <Button
                  className='w-full'
                  variant='destructive'
                  onClick={() => handleDelete(member.id)}
                >
                  Delete
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
};
