'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';
import { Suspense } from 'react';
import '@/lib/env';

import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import Spinner from '@/components/Spinner';
import { toast } from '@/components/ui/use-toast';

import { useServices } from '@/app/hooks/useServices';

const SelectFormClient = dynamic(() => import('@/components/CourseSelection'), {
  suspense: true,
});

export default function BookPage() {
  const { loading, error, services } = useServices();

  if (loading)
    return (
      <div className='flex w-screen h-screen items-center justify-center'>
        <Spinner />
      </div>
    );

  if (error) {
    toast({
      title: 'Error',
      description: error,
      variant: 'destructive',
    });
  }

  return (
    <main className='flex flex-col h-screen justify-between'>
      <header>
        <Banner />
        <Navbar />
      </header>
      <section className='mb-auto'>
        <PageHeader
          title='Choose Your Course'
          description='Pick a course that suits you.'
        />
        <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
          <div className='container mx-auto px-4 py-8'>
            <div className='mb-24 -mt-24'>
              <Suspense fallback={<div>Loading...</div>}>
                <SelectFormClient services={services} />
              </Suspense>
            </div>
            <h1 className='text-3xl font-bold mb-4'>About Us</h1>
            <p className='mb-4'>
              Drive 2 Learn is the trading name of Drive 2 Learn Ltd and shall
              be referred to throughout these terms of business as Drive 2
              Learn.
            </p>
            <p className='mb-8'>
              Drive 2 Learn engages with individual self-employed driving
              instructors who act in their capacity as sole traders. They agree
              to uphold the terms of agreement between Drive 2 Learn and
              instructor. The contract for driving tuition is solely between
              you(the consumer) and the driving instructor who has been chosen
              based on your location, availability and special requirements.
            </p>
            <h1 id='terms' className='text-3xl font-bold mb-4'>
              Terms and Conditions
            </h1>
            <p className='mb-4'>
              These terms and conditions outline the rules and regulations for
              driving lessons with Drive 2 Learn.
            </p>
            <h2 className='text-2xl font-bold mb-2'>Requirements</h2>
            <p className='mb-4'>In order to have driving lessons you must:</p>
            <ul className='list-disc list-inside mb-4'>
              <li>
                Be 17 years of age or older and hold a driving licence that is
                valid for the UK (provisional, full or an appropriate foreign
                licence)
              </li>
              <li>
                Before starting lessons, it is your responsibility to provide
                proof that you hold a valid license. The proof is held on record
                by Drive 2 Learn and protected by GDPR. If you fail to provide
                this proof, Drive 2 Learn is entitled to keep your deposit and
                your instructor has the right to refuse to conduct the driving
                lesson.
              </li>
            </ul>
            <p className='mb-8'>
              It is your responsibility to provide your instructor with proof
              that you have a valid licence to drive before the commencement of
              your first driving lesson. If you fail to provide this proof, your
              instructor is entitled to refuse to conduct the driving lesson but
              may still charge you for such driving lesson.
            </p>
            <h2 className='text-2xl font-bold mb-2'>Paying For Lessons</h2>
            <p className='mb-4'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              doloribus vero dolore voluptatem ea, explicabo eum fuga optio in
              eveniet ad repellendus magni quidem corporis? Aliquam optio
              recusandae dicta voluptas.
            </p>
            <h3 className='text-xl font-semibold mb-2'>Deposit</h3>
            <ul className='list-disc list-inside mb-4'>
              <li>
                Drive 2 Learn acts as the intermediary party between you and the
                instructor. The website and the contact centre are entities of
                Drive 2 Learn to allow you the consumer and customer to purchase
                driving courses with a driving instructor chosen by Drive 2
                Learn.
              </li>
              <li>
                Once deposit has been paid by the customer, Drive 2 Learn agrees
                to follow its terms and legislation to keep on trust the
                relevant funds in a safe client account of their choosing until
                Instructor and customer conduct their first lesson.
              </li>
              <li>
                Your funds which is the deposit paid by bank transfer or via the
                web sites payment process system are a separate to the funds
                used to pay the instructor. The instructor’s payment methods
                might be cash or bank transfer as per their terms and
                conditions. This might pre-payment for several lessons, for the
                whole course or pay as you on a lesson-by-lesson basis. The
                instructors’ terms and conditions are separate to Drive 2 Learn,
                if you would like to know more information then please do not
                hesitate to get in touch.
              </li>
            </ul>
            <h3 className='text-xl font-semibold mb-2'>Test Policy</h3>
            <ul className='list-disc list-inside mb-4'>
              <li>
                Test bookings can be made via Drive 2 Learn with the corporation
                of the driving instructors.
              </li>
              <li>
                If the Driving instructor does not believe you are test ready,
                then you can still go for the test, but you cannot take their
                vehicle.
              </li>
              <li>
                Drive 2 Learn have the ability to find cancelations, this being
                you are test ready and wanted to bring your test date earlier,
                with the corporation of the driving instructor.
              </li>
              <li>
                Any test bookings will be made and can be amended with the
                corporation of the driving instructor.
              </li>
              <li>
                The test fees are; £62 for the actual test booking, £75 if its
                booked on a Saturday. Plus an hour of the instructors time which
                is chargeable as a normal lesson depending on their fees.
              </li>
              <li>
                The hour of the instructors time can be included in the driving
                course if the driving instructor believes there is enough time
                for the lessons that you need.
              </li>
            </ul>
            <h3 className='text-xl font-semibold mb-2'>Cancellation Policy</h3>
            <ul className='list-disc list-inside mb-4'>
              <li>
                You as the customer, must give at least 48 hours’ notice to a
                Drive 2 Learn member, before your first lesson if you wish to
                cancel or reschedule a booked driving lesson. Failure to do so
                may result in losing your Deposit. This term overwrites your
                consumer rights were mentioned in the refund policy.
              </li>
              <li>
                The Driving Instructors do have their own cancelation policy’s
                which are always discussed prior to the deposit payment.
              </li>
              <li>
                Any disputed transaction regarding the deposit, will be
                investigated thoroughly by Drive 2 Learn. The result of the
                investigation will be clearly communicated to the customer. Your
                funds in the safe client account, will remain there until
                investigation has been completed to the satisfactory of Drive 2
                Learn.
              </li>
            </ul>
            <h3 className='text-xl font-semibold mb-2'>Refund Policy</h3>
            <ul className='list-disc list-inside mb-4'>
              <li>
                Drive 2 Learn are fair and believe in exercising your rights as
                a consumer to change your mind and cancel 14 days from paying
                the deposit. Drive 2 Learn are only responsible for the deposit
                funds and not for the tuition fee owed to the instructor by the
                customer. If you cancel 48 hours before your first lesson, then
                the consumer rights do not apply and you will lose your deposit.
                Each driving instructor will have their own terms and conditions
                on refund policy.
              </li>
              <li>
                Any refund issued by Drive 2 Learn, the funds will be made back
                to the bank account which the original payment was taken. If the
                bank account, no longer exists then Drive 2 Learn members
                reserve the right to verify identity of the person in question
                and seek validity for acceptance of an alternative bank account.
              </li>
              <li>
                Funds paid directly to your instructor are not protected by the
                Drive 2 Learn guarantee. Each driving instructor has their own
                terms and conditions regarding refunds. If you would like more
                details on this matter, after an instructor has been chosen for
                you then please do not hesitate to ask.
              </li>
              <li>
                Payment can only be made via the website payment system and bank
                transfer for the deposit. All the Driving instructors we work
                with, take cash and bank transfer.
              </li>
            </ul>
            <h3 className='text-xl font-semibold mb-2'>
              Paying Your Instructor Directly
            </h3>
            <ul className='list-disc list-inside mb-4'>
              <li>
                You the customer pay for lessons by paying your instructor
                directly without involving Drive 2 Learn. Your instructor will
                confirm which payment methods they can accept. Drive 2 Learn
                does not accept any responsibility for any payments you make
                directly to your instructor.
              </li>
            </ul>
            <h3 className='text-xl font-semibold mb-2'>Liability</h3>
            <p className='mb-4'>
              Your instructor and Drive 2 Learn are not liable to you for any
              loss or damage caused where, and to the extent that:
            </p>
            <ul className='list-disc list-inside mb-4'>
              <li>
                There is no breach of a legal duty owed to you by the relevant
                person or body;
              </li>
              <li>
                Such loss or damage is not a reasonably foreseeable result of
                such a breach of a legal duty;
              </li>
              <li>
                Any such loss or damage, or increase in the same, results from
                any breach or omission by you; or
              </li>
              <li>
                Any such loss or damage results from circumstances or matters
                outside of the reasonable control of the relevant person or
                body.
              </li>
            </ul>
            <p className='mb-4'>
              Your instructor and/ Drive 2 Learn shall not, in any event, be
              liable for losses relating to any business interests you may have
              including, without limitation, lost profits, loss of opportunity
              or business or business interruption.
            </p>
            <p className='mb-8'>
              Nothing in these Terms and Conditions will affect any statutory
              rights you may have as a consumer.
            </p>
            <h2 className='text-2xl font-bold mb-2'>
              Use of personal data and information
            </h2>
            <h3 className='text-xl font-semibold mb-2'>
              The Data Protection Act
            </h3>
            <p className='mb-4'>
              The{' '}
              <a
                href='https://www.legislation.gov.uk/ukpga/2018/12/contents/enacted'
                className='text-blue-400'
              >
                Data Protection Act 2018
              </a>{' '}
              controls how your personal information is used by organisations,
              businesses or the government.
            </p>
            <p className='mb-4'>
              The Data Protection Act 2018 is the UK’s implementation of the
              General Data Protection Regulation (GDPR).
            </p>
            <p className='mb-4'>
              Everyone responsible for using personal data has to follow strict
              rules called ‘data protection principles’. They must make sure the
              information is:
            </p>
            <ul className='list-disc list-inside mb-4'>
              <li>used fairly, lawfully and transparently</li>
              <li>used for specified, explicit purposes</li>
              <li>
                used in a way that is adequate, relevant and limited to only
                what is necessary
              </li>
              <li>accurate and, where necessary, kept up to date</li>
              <li>kept for no longer than is necessary</li>
              <li>
                handled in a way that ensures appropriate security, including
                protection against unlawful or unauthorised processing, access,
                loss, destruction or damage
              </li>
            </ul>
            <p className='mb-4'>
              There is stronger legal protection for more sensitive information,
              such as:
            </p>
            <ul className='list-disc list-inside mb-4'>
              <li>race</li>
              <li>ethnic background</li>
              <li>political opinions</li>
              <li>religious beliefs</li>
              <li> trade union membership</li> <li>genetics</li>
              <li>biometrics (where used for identification)</li>
              <li>health</li>
              <li>sex life or orientation</li>
            </ul>
            <p className='mb-8'>
              There are separate safeguards for personal data relating to
              criminal convictions and offences.
            </p>
            <h3 className='text-xl font-semibold mb-2'>Your Rights</h3>
            <p className='mb-4'>
              Under the Data Protection Act 2018, you have the right to find out
              what information the government and other organisations store
              about you. These include the right to:
            </p>
            <ul className='list-disc list-inside mb-4'>
              <li>race</li>
              <li>ethnic background</li>
              <li>political opinions</li>
              <li>religious beliefs</li>
              <li> trade union membership</li>
              <li>genetics</li>
              <li>biometrics (where used for identification)</li>
              <li>health</li>
              <li>sex life or orientation</li>
            </ul>
            <p className='mb-4'>
              You also have rights when an organisation is using your personal
              data for:
            </p>
            <ul className='list-disc list-inside mb-4'>
              <li>
                automated decision-making processes (without human involvement)
              </li>
              <li>
                profiling, for example to predict your behaviour or interests
              </li>
            </ul>
            <p className='mb-4'>
              Drive 2 Learn complies with GDPR guidelines and are ICO
              registered. Drive 2 Learn follows the eight data protection
              principals;
            </p>
            <ul className='list-disc list-inside mb-4'>
              <li>Fair and lawful</li>
              <li>Purposes</li>
              <li>Adequacy</li>
              <li>Accuracy</li>
              <li>Retention</li>
              <li>Rights</li>
              <li>Security</li>
              <li>International</li>
            </ul>
            <p className='mb-4'>
              Personal data, and/or information about you, that you provide to
              Drive 2 Learn and/or your instructor may be used to:
            </p>
            <ul className='list-disc list-inside mb-4'>
              <li>Identify you</li>
              <li>Contact you</li>
              <li>Keep all data secure</li>
              <li>
                Provide personal data and/or information when asked by a legal
                or regulatory body
              </li>
              <li>Monitor and record correspondence</li>
              <li>Protect your safe client account</li>
              <li>Carry out customer profiling</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
