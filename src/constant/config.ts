import {
  Handshake,
  Home,
  Image,
  Pencil,
  ShoppingBag,
  Star,
  Users2,
  Workflow,
} from 'lucide-react';

export const siteConfig = {
  title: 'Drive 2 Learn',
  description:
    'Learn to drive with Drive 2 Learn. We offer driving lessons in and around the South and West Yorkshire area. We have a range of driving courses to suit all levels of experience. Book your driving lessons today!',
  url: 'https://drive2learn.co.uk',
  instagram:
    'https://www.instagram.com/drive_2_learn?igsh=MXd2ZncybDgwM2c3dw==',
  facebook: 'https://www.facebook.com/share/7RgFrmS26oBqcMd9/',
  linkedin:
    'https://www.linkedin.com/in/alex-d2l-570a98287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  google:
    'https://www.google.com/maps/place/Drive+2+Learn+with+Alex/@53.6398854,-1.3486284,15z/data=!4m5!3m4!1s0x0:0x2b5a6ab71f7937b4!8m2!3d53.6398854!4d-1.3486284?sa=X&ved=2ahUKEwjP97qR39H8AhVJe8AKHYLCC3AQ_BJ6BAhdEAk&coh=164777&entry=tt&shorturl=1',
  navigationLinks: [
    {
      title: 'About',
      href: '/about',
      links: [
        {
          title: 'About',
          href: '/about',
          description: 'Learn more about Drive 2 Learn',
        },
        {
          title: 'Locations',
          href: '/about#locations',
          description: 'Find out where we operate',
        },
        {
          title: 'Terms and Conditions',
          href: '/terms',
          description: 'Read our terms and conditions',
        },
        {
          title: 'Reviews',
          href: '/about#reviews',
          description: 'Read what our customers have to say',
        },
      ],
    },
    {
      title: 'Courses',
      href: '/book',
      links: [
        {
          title: 'Book a Lesson',
          href: '/book',
          description: 'Book your driving lessons',
        },
        {
          title: 'Instructor Training',
          href: '/instructor-training',
          description: 'Become a driving instructor',
        },
      ],
    },
    {
      title: 'DVSA',
      href: '/dvsa',
    },
    {
      title: 'Gallery',
      href: '/gallery',
    },
    {
      title: 'Community',
      href: '/community',
    },
    {
      title: 'Products',
      href: '/products',
    },
  ],
  dashboardNavigationLinks: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'Gallery',
      href: '/dashboard/gallery',
      icon: Image,
    },
    {
      name: 'Reviews',
      href: '/dashboard/reviews',
      icon: Star,
    },
    {
      name: 'Services',
      href: '/dashboard/services',
      icon: Workflow,
    },
    {
      name: 'Team',
      href: '/dashboard/team',
      icon: Users2,
    },
    {
      name: 'Products',
      href: '/dashboard/products',
      icon: ShoppingBag,
    },
    {
      name: 'Community',
      href: '/dashboard/community',
      icon: Handshake,
    },
    {
      name: 'Editor',
      href: '/dashboard/editor',
      icon: Pencil,
    },
  ],
};
