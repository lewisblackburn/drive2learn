'use client';

import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';

import '@/styles/editor.css';

interface ContentProps {
  title: string;
  content: OutputData;
}

// Default content in case no data is passed
export const defaultContent: OutputData = {
  blocks: [
    {
      type: 'header',
      data: {
        text: 'No Content',
        level: 1,
      },
    },
  ],
  time: 0,
  version: '2.22.2',
};

const Content = ({ title, content }: ContentProps) => {
  const editorRef = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Ensure this code runs only on the client-side
  useEffect(() => {
    if (typeof window !== 'undefined' && editorContainerRef.current) {
      editorRef.current = new EditorJS({
        holder: editorContainerRef.current,
        placeholder: 'Type here to edit your content...',
        inlineToolbar: true,
        data: content,
        tools: {
          header: Header,
          list: List,
        },
        readOnly: true, // Make the editor read-only
      });

      return () => {
        if (
          editorRef.current &&
          typeof editorRef.current.destroy === 'function'
        ) {
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };
    }
  }, [content]);

  return (
    <div>
      <h1>{title}</h1>
      <div ref={editorContainerRef} className='editor-container' />
    </div>
  );
};

// Export dynamically with no SSR
export default dynamic(() => Promise.resolve(Content), { ssr: false });
