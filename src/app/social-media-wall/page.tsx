'use client';

import * as React from 'react';
import '@/lib/env';

import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

export default function SocialMediaWallPage() {
  const [posts, setPosts] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch('/social-posts.json')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Load external embed scripts once after mount
  React.useEffect(() => {
    if (posts.length > 0) {
      if (!document.getElementById('facebook-jssdk')) {
        const fbScript = document.createElement('script');
        fbScript.id = 'facebook-jssdk';
        fbScript.src =
          'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0';
        document.body.appendChild(fbScript);
      }

      if (!document.getElementById('instagram-embed')) {
        const igScript = document.createElement('script');
        igScript.id = 'instagram-embed';
        igScript.src = 'https://www.instagram.com/embed.js';
        document.body.appendChild(igScript);
      }

      if (!document.getElementById('tiktok-embed')) {
        const ttScript = document.createElement('script');
        ttScript.id = 'tiktok-embed';
        ttScript.src = 'https://www.tiktok.com/embed.js';
        document.body.appendChild(ttScript);
      }
    }
  }, [posts]);

  const renderEmbed = (url: string) => {
    if (url.includes('facebook.com')) {
      return (
        <div
          className='fb-post'
          data-href={url}
          data-width='auto'
          style={{
            maxWidth: '350px',
            width: '100%',
            margin: '0 auto',
            display: 'block',
          }}
        ></div>
      );
    }
    if (url.includes('instagram.com')) {
      return (
        <blockquote
          className='instagram-media'
          data-instgrm-permalink={url}
          data-instgrm-version='14'
          style={{
            background: '#FFF',
            border: 0,
            margin: '0 auto 1rem',
            padding: 0,
            maxWidth: '350px',
            width: '100%',
            boxSizing: 'border-box',
            display: 'block',
          }}
        ></blockquote>
      );
    }
    if (url.includes('tiktok.com')) {
      const videoId = url.split('/video/')[1];
      return (
        <blockquote
          className='tiktok-embed'
          cite={url}
          data-video-id={videoId}
          style={{
            maxWidth: '350px',
            width: '100%',
            margin: '0 auto',
            display: 'block',
          }}
        >
          <section></section>
        </blockquote>
      );
    }
    return null;
  };

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .fb-post,
          .instagram-media,
          .tiktok-embed {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
      <main className='flex flex-col min-h-screen'>
        <section className='mb-auto'>
          <PageHeader
            title='Social Media Wall'
            description='Stay connected with Drive 2 Learn on Social Media'
            image='/images/headers/3.jpg'
          />

          <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
              {posts.map((url, idx) => (
                <div
                  key={idx}
                  className='w-full flex justify-center px-2 sm:px-0'
                  style={{ maxWidth: '350px', width: '100%' }}
                >
                  <div style={{ margin: '0 auto', width: '100%' }}>
                    {renderEmbed(url)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
