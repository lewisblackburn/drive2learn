import React from 'react';
import {
  RiFacebookLine,
  RiGoogleLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiMapPin2Line,
  RiPhoneLine,
  RiTiktokLine,
} from 'react-icons/ri';

import Issues from '@/components/Issues';
import { Logo } from '@/components/Logo';

import { siteConfig } from '@/constant/config';

const Footer = () => {
  return (
    <>
      <footer className='relative z-10 bg-white pb-10 pt-20 lg:pb-20 lg:pt-[120px] border-t'>
        <div className='container'>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4 sm:w-2/3 lg:w-3/12'>
              <div className='mb-10 w-full'>
                <Logo />
                <p className='my-9 text-base text-body-color'>
                  KEEP CALM AND DRIVE SAFE!
                </p>
                <div className='flex flex-col space-y-5'>
                  <p className='flex items-center text-sm font-medium text-dark'>
                    <RiPhoneLine className='text-primary text-xl mr-2' />
                    <span>0333 772 3575</span>
                  </p>
                  <a
                    href='https://www.google.com/maps?q=Unit+45,+Innovation+Way,+S75+1JL'
                    className='flex items-center text-sm font-medium text-dark'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <RiMapPin2Line className='text-primary text-xl mr-2' />
                    <span>Unit 45, Innovation Way, S75 1JL</span>
                  </a>
                  <p className='text-sm text-muted-foreground'>
                    Please make an appointment if you wish to meet the team 🙂
                  </p>
                </div>
              </div>
            </div>

            <LinkGroup header='Resources'>
              <NavLink
                link='https://www.safedrivingforlife.info/free-practice-tests/practice-theory-test-for-car-drivers-1-of-2/'
                label='Theory Test'
              />
              <NavLink
                link='https://www.safedrivingforlife.info/free-practice-tests/hazard-perception-test/'
                label='Hazard Perception Test'
              />
              <NavLink
                link='https://www.safedrivingforlife.info/shop/car/'
                label='eLearning Kit'
              />
            </LinkGroup>
            <LinkGroup header='Company'>
              <NavLink
                link='/instructor-training'
                label='Instructor Training'
              />
              <NavLink link='/book' label='Book a Lesson' />
              <NavLink link='/#contact' label='Contact & Support' />
              <NavLink link='/book#terms' label='Terms & Conditions' />
            </LinkGroup>
            <LinkGroup header='Quick Links'>
              <NavLink link='/about' label='About' />
              <NavLink link='/dvsa' label='DVSA' />
              <NavLink link='/gallery' label='Gallery' />
            </LinkGroup>

            <div className='w-full px-4 sm:w-1/2 lg:w-3/12'>
              <div className='mb-10 w-full'>
                <h4 className='mb-9 text-lg font-semibold text-dark '>
                  Follow Us On
                </h4>
                <div className='mb-6 flex items-center space-x-4'>
                  <a
                    href={siteConfig.facebook}
                    target='_blank'
                    rel='noreferrer'
                    className='border rounded-full p-2 hover:bg-[#17A9FD] hover:text-white transition-all duration-75'
                  >
                    <RiFacebookLine className=' text-md' />
                  </a>
                  <a
                    href={siteConfig.instagram}
                    target='_blank'
                    rel='noreferrer'
                    className='border rounded-full p-2 hover:bg-[#E1306C] hover:text-white transition-all duration-75'
                  >
                    <RiInstagramLine className=' text-md' />
                  </a>
                  <a
                    href={siteConfig.linkedin}
                    target='_blank'
                    rel='noreferrer'
                    className='border rounded-full p-2 hover:bg-[#0A66C2] hover:text-white transition-all duration-75'
                  >
                    <RiLinkedinLine className=' text-md' />
                  </a>
                  <a
                    href={siteConfig.google}
                    target='_blank'
                    rel='noreferrer'
                    className='border rounded-full p-2 hover:bg-[#34A853] hover:text-white transition-all duration-75'
                  >
                    <RiGoogleLine className=' text-md' />
                  </a>
                  <a
                    href={siteConfig.tiktok}
                    target='_blank'
                    rel='noreferrer'
                    className='border rounded-full p-2 hover:bg-[#7b68ee] hover:text-white transition-all duration-75'
                  >
                    <RiTiktokLine className=' text-md' />
                  </a>
                </div>
                <p className='text-base text-body-color '>
                  &copy; 2024 Drive2Learn
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Issues />
    </>
  );
};

export default Footer;

const LinkGroup = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) => {
  return (
    <>
      <div className='w-full px-4 sm:w-1/2 lg:w-2/12'>
        <div className='mb-10 w-full'>
          <h4 className='mb-9 text-lg font-semibold text-dark '>{header}</h4>
          <ul className='space-y-3'>{children}</ul>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ link, label }: { link: string; label: string }) => {
  return (
    <li>
      <a
        href={link}
        className='inline-block text-base leading-loose text-body-color hover:text-primary '
      >
        {label}
      </a>
    </li>
  );
};
