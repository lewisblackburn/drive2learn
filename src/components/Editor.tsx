/* eslint-disable no-console */
import EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import * as z from 'zod';

import '@/styles/editor.css';

import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

import Spinner from '@/components/Spinner';
import { buttonVariants } from '@/components/ui/button';

import { Data } from '@/app/hooks/useData';

// Define schema for form data
export const dataPatchSchema = z.object({
  id: z.number(),
  title: z.string().min(3).max(128).optional(),
  content: z
    .object({
      blocks: z
        .array(
          z.object({
            type: z.string(),
            data: z.record(z.any()), // Adjust based on specific block requirements
          }),
        )
        .default([]), // Default to an empty array if blocks are missing
    })
    .optional(),
});

interface EditorProps {
  data: Data | undefined;
}

type FormData = z.infer<typeof dataPatchSchema>;

export function Editor({ data }: EditorProps) {
  const supabase = createClient();
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(dataPatchSchema),
  });

  const ref = React.useRef<EditorJS | null>(null);
  const editorContainerRef = React.useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  // Initialize EditorJS instance
  const initializeEditor = React.useCallback(async () => {
    if (!data || !editorContainerRef.current) {
      console.error(
        'No data available for EditorJS initialization or editor container is missing.',
      );
      return;
    }

    try {
      const EditorJS = (await import('@editorjs/editorjs')).default;
      const Header = (await import('@editorjs/header')).default;
      const List = (await import('@editorjs/list')).default;

      const body = dataPatchSchema.parse(data);
      const editorData = body.content || { blocks: [] };

      // Check if EditorJS instance is not already created
      if (!ref.current) {
        ref.current = new EditorJS({
          holder: editorContainerRef.current,
          placeholder: 'Type here to edit your content...',
          inlineToolbar: true,
          data: editorData,
          tools: {
            header: Header,
            list: List,
          },
        });
      } else {
        // Handle existing EditorJS instance if needed
        console.log('EditorJS instance already exists');
      }
    } catch (error) {
      console.error('Error initializing the editor:', error);
    }
  }, [data]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted && data) {
      initializeEditor();
      reset(dataPatchSchema.parse(data));
      return () => {
        // Safeguard `destroy` method call
        if (ref.current && typeof ref.current.destroy === 'function') {
          ref.current.destroy();
          ref.current = null;
        }
      };
    }
  }, [isMounted, data, initializeEditor, reset]);

  async function onSubmit(formData: FormData) {
    setIsSaving(true);

    try {
      const savedData = await ref.current?.save();

      if (!savedData || !savedData.blocks || savedData.blocks.length === 0) {
        console.error('Content is empty or missing blocks.');
        setIsSaving(false);
        return;
      }

      try {
        dataPatchSchema.shape.content?.parse(savedData);
      } catch (error) {
        console.error('Saved data does not match schema:', error);
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from('data')
        .update({
          title: formData.title,
          content: savedData,
        })
        .eq('id', formData.id);

      if (error) {
        console.error('Error updating content in database:', error);
      } else {
        console.log('Content successfully updated in database');
      }
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  }

  if (!isMounted) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <div className='grid w-full gap-10'>
        <div className='flex w-full items-center justify-between'>
          <button type='submit' className={cn(buttonVariants())}>
            {isSaving && <Spinner />}
            <span>Save</span>
          </button>
        </div>
        <div className='w-full mx-auto'>
          <input
            type='hidden'
            id='id'
            defaultValue={data?.id} // Default value for id
            {...register('id', { valueAsNumber: true })}
          />
          <TextareaAutosize
            autoFocus
            id='title'
            defaultValue={data?.title} // Default value for title
            placeholder='Title'
            className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
            {...register('title')}
          />
          <div ref={editorContainerRef} className='w-full' />
        </div>
      </div>
    </form>
  );
}
