'use client';

import {
  BookHeart,
  Calendar,
  CarFront,
  CarIcon,
  ClockIcon,
  Hourglass,
  Library,
  PoundSterling,
  ShieldPlus,
  TestTube2Icon,
  Users,
} from 'lucide-react';
import * as React from 'react';
import '@/lib/env';

import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';

export default function InstructorTrainingPage() {
  return (
    <main className='flex flex-col h-screen justify-between'>
      <header>
        <Banner />
        <Navbar />
      </header>
      {/* mb-auto needed for bottom footer */}
      <section className='mb-auto'>
        <PageHeader
          title='Instructor Training'
          description='We also offer training for those who want to become driving instructors. Our training is designed to help you pass the DVSA Approved Driving Instructor (ADI) exams and become a successful driving instructor.'
        />
        <FeatureOne />
        <FeatureTwo />
        <FeatureThree />
      </section>
      <Footer />
    </main>
  );
}

const featuresOne = [
  {
    name: 'Personalized 1-on-1 Coaching',
    description:
      'Our program offers personalized 1-on-1 coaching to ensure each trainee gets tailored guidance. This approach helps address individual strengths and weaknesses, providing customized study plans and immediate feedback for maximized potential.',
    icon: BookHeart,
  },
  {
    name: '24/7 Support from Trainers and Peer Trainees',
    description:
      'We provide 24/7 support from experienced trainers and fellow trainees, ensuring assistance is available whenever needed. This constant availability allows you to progress at your own pace and get help anytime.',
    icon: ClockIcon,
  },
  {
    name: 'Organized Study Groups',
    description:
      'Our organized study groups promote collaborative learning. These groups help trainees share knowledge, discuss complex topics, and prepare for assessments together, fostering a sense of community and mutual support.',
    icon: Users,
  },
  {
    name: 'Comprehensive Guide to Study Materials',
    description:
      'We offer a comprehensive guide to study materials, including textbooks, online resources, and practice exercises. This all-in-one resource allows you to study efficiently without the need to search for additional information.',
    icon: Library,
  },
];

function FeatureOne() {
  return (
    <div className='relative bg-white py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
        <p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
          Theory and Hazard Perception
        </p>
        <p className='mt-5 text-xl text-gray-500'>
          The test consists of 2 parts. First part is multiple-choice theory
          questions and the second part is hazard perception videos to spot the
          developing hazards on the road as they appear. To pass the
          multiple-choice test, you must get both: an overall score of at least
          85 out of 100 and at least 20 out of 25 in each of the 4 categories.
          To pass the hazard perception test, you need to get a score of at
          least 57 out of 75. You must pass both tests to pass Part 1.
        </p>
        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
            {featuresOne.map((feature) => (
              <div key={feature.name} className='pt-6'>
                <div className='flow-root bg-gray-50 rounded-lg px-6 pb-8'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center p-3 bg-red-500 rounded-md shadow-lg'>
                        <feature.icon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
                      {feature.name}
                    </h3>
                    <p className='mt-5 text-base text-gray-500'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const featuresTwo = [
  {
    name: 'Comprehensive Drive Assessment',
    description:
      'A thorough evaluation designed to measure your current capabilities and identify areas for improvement.',
    icon: CarIcon,
  },
  {
    name: 'Corresponding Training',
    description:
      'Tailored training programs aligned with your personal development goals to enhance your skills effectively.',
    icon: ShieldPlus,
  },
  {
    name: 'Expert Test Preparation',
    description:
      'Professional guidance and strategies to ensure you are fully prepared for your upcoming test.',
    icon: TestTube2Icon,
  },
];

function FeatureTwo() {
  return (
    <div className='relative bg-white py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
        <p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
          Driving Ability Test
        </p>
        <p className='mt-5 text-xl text-gray-500'>
          You need to complete an advanced practical driving test which
          demonstrates advanced driving skills and expert knowledge in the
          Highway Code. It lasts an hour and covers 5 parts: eyesight check,
          vehicle safety, general driving ability, manoeuvres, and independent
          driving. To pass your Part 2 Driving Ability Test you need to make: no
          more than 6 driving faults and no serious or dangerous faults.
        </p>
        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {featuresTwo.map((feature) => (
              <div key={feature.name} className='pt-6'>
                <div className='flow-root bg-gray-50 rounded-lg px-6 pb-8'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center p-3 bg-red-500 rounded-md shadow-lg'>
                        <feature.icon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
                      {feature.name}
                    </h3>
                    <p className='mt-5 text-base text-gray-500'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const featuresThree = [
  {
    name: 'Expert Car Coaching to Develop Your Skills',
    description:
      'Receive expert car coaching designed to enhance your driving skills and knowledge. Our experienced trainers will help you become a proficient and confident driver.',
    icon: CarFront,
  },
  {
    name: 'Professional Guidance from Genuine Driving Instructors',
    description:
      'Benefit from professional guidance provided by genuine driving instructors. Their expertise ensures you receive top-quality instruction and support throughout your training.',
    icon: ShieldPlus,
  },
  {
    name: 'Students That Fit Your Schedule',
    description:
      'Teach students whose schedules align with yours. This flexibility allows you to manage your time effectively and maintain a balanced lifestyle.',
    icon: Calendar,
  },
  {
    name: 'Work Your Own Hours Without Micromanagement',
    description:
      'Enjoy the freedom to work your own hours without being micromanaged. This autonomy enables you to set your own pace and create a work schedule that suits your needs.',
    icon: Hourglass,
  },
  {
    name: 'Earn While You Train on a Trainee License',
    description:
      'Earn an income while you train with a trainee license. This opportunity allows you to gain practical experience and financial stability simultaneously.',
    icon: PoundSterling,
  },
  {
    name: '24/7 Support When Needed',
    description:
      'Access 24/7 support whenever you need it. Our team is always available to provide assistance and answer any questions, ensuring you feel supported throughout your training.',
    icon: ClockIcon,
  },
];

function FeatureThree() {
  return (
    <div className='relative bg-white py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
        <p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
          Instructional Ability Test
        </p>
        <p className='mt-5 text-xl text-gray-500'>
          A Driver and Vehicle Standards Agency (DVSA) examiner will watch you
          giving a client-centred driving lesson to one of your pupils for about
          45 minutes. At the start of the lesson, discuss the goals for the
          lesson and risk management with your pupil. This should take no more
          than 3 minutes. Your pupil must drive for about 40 minutes of the
          lesson. You cannot spend the whole lesson teaching a manoeuvre, but
          you can include a short recap of one you’ve taught in a previous
          lesson. If you need to give your pupil immediate feedback, you are
          allowed to stop safely during the lesson. At the end of the lesson,
          give your pupil no more than 3 minutes to reflect on their
          performance. The examiner will look for evidence that you meet the
          national standard for driver and rider training. You’ll be marked on
          17 areas of competence that are grouped into 3 categories: lesson
          planning risk management teaching and learning strategies. The 17
          areas of competence are listed in the ADI part 3 test report form,
          which the examiner will fill in at the end of your test. You’ll get a
          score from 0 to 3 for each of the 17 competencies, which are added up
          to work out if you’ve passed the test, and what your grade will be.
        </p>
        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {featuresThree.map((feature) => (
              <div key={feature.name} className='pt-6'>
                <div className='flow-root bg-gray-50 rounded-lg px-6 pb-8'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center p-3 bg-red-500 rounded-md shadow-lg'>
                        <feature.icon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
                      {feature.name}
                    </h3>
                    <p className='mt-5 text-base text-gray-500'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
