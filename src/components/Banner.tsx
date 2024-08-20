import { Mail, Share2 } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import {
  RiFacebookFill,
  RiGoogleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
} from 'react-icons/ri';

import { siteConfig } from '@/constant/config';

export default function Banner() {
  return (
    <div className='flex flex-col space-y-3 lg:space-y-0 lg:flex-row items-center justify-between bg-foreground text-white px-5 xl:px-32 py-5'>
      <Link href='/#contact'>
        <div className='flex items-center space-x-3'>
          <Mail className='text-primary' />
          <span className='font-bold uppercase text-xs tracking-widest'>
            Get In Touch
          </span>
        </div>
      </Link>
      {/* <div>
        <div className='flex items-center space-x-3'>
          <MapPin className='text-primary' />
          <span className='font-bold uppercase text-xs tracking-widest'>
            About Us
          </span>
        </div>
      </div> */}
      <div className='hidden lg:flex items-center'>
        <Share2 className='text-primary mr-3' />
        <span className='font-bold uppercase text-xs tracking-widest mr-2'>
          Social Media:
        </span>
        <div className='flex items-center space-x-3'>
          <a href={siteConfig.facebook} target='_blank' rel='noreferrer'>
            <RiFacebookFill />
          </a>
          <a href={siteConfig.instagram} target='_blank' rel='noreferrer'>
            <RiInstagramFill />
          </a>

          <a href={siteConfig.linkedin} target='_blank' rel='noreferrer'>
            <RiLinkedinBoxFill />
          </a>
          <a href={siteConfig.google} target='_blank' rel='noreferrer'>
            <RiGoogleFill />
          </a>
        </div>
      </div>
    </div>
  );
}
