'use client';

import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import NestedList from '@editorjs/nested-list';
import React, { useEffect, useRef } from 'react';

import '@/styles/editor.css';

interface ContentProps {
  title?: string;
  content?: OutputData | undefined;
}

const Content = ({ title, content }: ContentProps) => {
  const editorRef = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && editorContainerRef.current) {
      editorRef.current = new EditorJS({
        holder: editorContainerRef.current,
        placeholder: 'Type here to edit your content...',
        inlineToolbar: true,
        data: content,
        tools: {
          header: Header,
          list: NestedList,
        },
        readOnly: true,
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

  if (!content || !title) {
    return null;
  }

  return (
    <div>
      <h1>{title}</h1>
      <div ref={editorContainerRef} className='editor-container' />
    </div>
  );
};

export default Content;
