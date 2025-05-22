'use client';

import AutoScroll from 'embla-carousel-auto-scroll';
import { Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const testimonials = [
  {
    name: 'Zain, Stoke',
    role: 'Driving Instructor',
    avatar: '/images/avatars/avatar-1.webp',
    content:
      'I initially contacted Alex for support with my ADI Part 2 test, and thanks to his guidance and expertise, I was able to pass with confidence. I then continued by training with him for the ADI Part 3 test, which I passed first time \n Alex has been consistently supportive throughout the entire process - always approachable, knowledgeable, and generous with his time. His clam and professional approach made a real difference.',
  },
  {
    name: 'Rachel, Nottingham',
    role: 'Driving Instructor',
    avatar: '/images/avatars/avatar-2.webp',
    content:
      'Worked with Drive 2 Learn for 6 months during my sponsorship with them. Alex and the team really did go the extra mile to make sure I was ready for my Part 3. In the end, I passed first time. I have been reccomending them to everyone. Thank you again Alex and team.',
  },
  {
    name: 'Steve, Hull',
    role: 'Driving Instructor',
    avatar: '/images/avatars/avatar-3.webp',
    content:
      'I was really impressed with Alex and how much knowledge and expertise he has. I have been an instructor for 9 years now and just had my first standards check. I was so nervous that I wanted extra training to prepare. I only spent 6 hours with Alex and in that short time, I learned so much. With out doubt, I will be doing more training with Alex in the future.',
  },
  {
    name: 'Mohammed, Leeds',
    role: 'Driving Instructor',
    avatar: '/images/avatars/avatar-4.webp',
    content:
      "Thank you Alex so much for your help. I don't mind saying that I have failed my Part 3, three times and when I had to go round again... Alex and Drive 2 Learn got me through the Part 3 first time. I wish I went with you the first time. Highly recommend.",
  },
  {
    name: 'Faye, Lincoln',
    role: 'Driving Instructor',
    avatar: '/images/avatars/avatar-5.webp',
    content:
      'I have been working with Drive 2 Learn for 5 years now. I go out with Alex now and again to be the best I can be and keep my standards high. I honestly love working with Alex, he is a true professional, very grounded and just an emotionally intelligent Instructor Trainer.',
  },
];

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [api, setApi] = useState<any>();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!api || !isMobile) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [api, isMobile]);

  const plugin = useRef(
    AutoScroll({
      speed: 0.7,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <section className='py-24 bg-white text-black' id='testimonials'>
      <div className='container flex flex-col items-center gap-4'>
        <h2 className='text-center text-3xl font-semibold lg:text-4xl text-black'>
          Trusted by Driving Instructors
        </h2>
        <p className='text-center text-gray-600 lg:text-lg'>
          Join a growing community of professional driving instructors
        </p>
      </div>
      <div className='lg:container'>
        <div className='mt-16 space-y-4'>
          <Carousel
            opts={{
              loop: true,
              align: 'center',
            }}
            plugins={!isMobile ? [plugin.current] : []}
            onMouseEnter={() => !isMobile && plugin.current.stop()}
            onMouseLeave={() => !isMobile && plugin.current.play()}
            setApi={setApi}
            className='relative before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-12 sm:before:w-36 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-12 sm:after:w-36 after:bg-gradient-to-l after:from-white after:to-transparent'
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className='basis-auto'>
                  <Card className='max-w-96 p-6 select-none bg-white border-gray-200 shadow-sm'>
                    <div className='flex justify-between'>
                      <div className='mb-4 flex gap-4'>
                        <Avatar className='size-14 rounded-full ring-1 ring-red-500'>
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                        </Avatar>
                        <div>
                          <p className='font-medium text-black'>
                            {testimonial.name}
                          </p>
                          <p className='text-sm text-gray-600'>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className='flex gap-1 ml-5'>
                        <Star className='size-5 fill-red-500 text-red-500' />
                        <Star className='size-5 fill-red-500 text-red-500' />
                        <Star className='size-5 fill-red-500 text-red-500' />
                        <Star className='size-5 fill-red-500 text-red-500' />
                        <Star className='size-5 fill-red-500 text-red-500' />
                      </div>
                    </div>
                    <q className='leading-7 text-gray-600'>
                      {testimonial.content}
                    </q>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Testimonials };
