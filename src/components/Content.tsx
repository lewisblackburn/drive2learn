/* eslint-disable no-console */
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import React, { useEffect, useRef } from 'react';

import '@/styles/editor.css';

interface ContentProps {
  title: string;
  content: OutputData;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultContent: any = {
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

export function Content({ title, content }: ContentProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  // Initialize EditorJS instance
  const initializeEditor = React.useCallback(() => {
    if (!editorContainerRef.current) {
      console.error('Editor container is missing.');
      return;
    }

    if (!editorRef.current) {
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
    }
  }, [content]);

  // Handle component mount and unmount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
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
  }, [isMounted, initializeEditor]);

  return (
    <div>
      <h1>{title}</h1>
      <div ref={editorContainerRef} className='editor-container' />
    </div>
  );
}
