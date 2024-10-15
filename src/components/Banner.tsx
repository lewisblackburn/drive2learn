import { Mail, Share2 } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import {
  RiFacebookFill,
  RiGoogleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTiktokFill,
} from 'react-icons/ri';

import { siteConfig } from '@/constant/config';

export default function Banner() {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between bg-foreground text-white px-3 md:px-5 xl:px-32 py-3 md:py-5 space-y-3 md:space-y-0'>
      <div className='flex items-center justify-center space-x-3 w-full md:w-auto'>
        <Link href='/#contact'>
          <div className='flex items-center space-x-2'>
            <Mail className='text-primary text-sm' />
            <span className='font-bold uppercase text-[10px] tracking-widest'>
              Get In Touch
            </span>
          </div>
        </Link>
      </div>
      <div className='flex items-center justify-center space-x-3 w-full md:w-auto'>
        <Share2 className='text-primary text-sm' />
        <span className='font-bold uppercase text-[10px] tracking-widest'>
          Social Media:
        </span>
        <div className='flex items-center space-x-2'>
          <a href={siteConfig.facebook} target='_blank' rel='noreferrer'>
            <RiFacebookFill className='text-sm' />
          </a>
          <a href={siteConfig.instagram} target='_blank' rel='noreferrer'>
            <RiInstagramFill className='text-sm' />
          </a>
          <a href={siteConfig.linkedin} target='_blank' rel='noreferrer'>
            <RiLinkedinBoxFill className='text-sm' />
          </a>
          <a href={siteConfig.google} target='_blank' rel='noreferrer'>
            <RiGoogleFill className='text-sm' />
          </a>
          <a href={siteConfig.tiktok} target='_blank' rel='noreferrer'>
            <RiTiktokFill className='text-sm' />
          </a>
        </div>
      </div>
    </div>
  );
}
