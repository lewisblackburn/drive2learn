import Link from 'next/link';
import React from 'react';

export const Pricing = () => {
  return (
    <section className='relative z-10 overflow-hidden bg-white pb-12 pt-10 lg:pb-[90px]'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='mx-auto mb-[60px] max-w-[510px] text-center'>
              <span className='mb-2 block text-lg font-semibold text-primary'>
                Pricing Table
              </span>
              <h2 className='mb-3 text-3xl font-bold leading-[1.208] text-dark sm:text-4xl md:text-[40px]'>
                Our Pricing Plan
              </h2>
              <p className='text-base text-body-color'>
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className='-mx-4 flex flex-wrap justify-center'>
          <div className='-mx-4 flex flex-wrap'>
            <PricingCard
              type='Driving Courses'
              price='From £440'
              description='Pass your practical driving test with our expert instructors.'
              buttonText='Read More'
              buttonLink='/book?course=Experienced / Refresher'
              active={false}
            >
              <List>Free Pickup</List>
              <List>Practical Lessons</List>
              <List>Theory Tips</List>
              <List>Manual Car</List>
            </PricingCard>
            <PricingCard
              type='Instructor Training'
              price='From £50/ph'
              description='Become a successful driving instructor with us and join our community.'
              buttonText='Read More'
              buttonLink='/instructor_training'
              active
            >
              <List>Training for Part 1/2/3</List>
              <List>Help with standards checks</List>
              <List>One-on-one training sessions</List>
              <List>Earn whilst you train</List>
            </PricingCard>
            <PricingCard
              type='Help & Support'
              price='Free'
              description='Feel free to get in touch if you have any enquiries.'
              buttonText='Read More'
              buttonLink='/#contact'
              active={false}
            >
              <List>Expert Advice</List>
              <List>Guidence</List>
              <List>No obligations</List>
              <List>Grounded People</List>
            </PricingCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

const PricingCard = ({
  children,
  description,
  price,
  type,
  buttonText,
  buttonLink,
  active,
}: {
  children: React.ReactNode;
  description: string;
  price: string;
  type: string;
  buttonText: string;
  buttonLink: string;
  active: boolean;
}) => {
  return (
    <>
      <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
        <div className='relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 shadow-pricing sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]'>
          <span className='mb-3 block text-lg font-semibold text-primary'>
            {type}
          </span>
          <h2 className='mb-5 text-[42px] font-bold text-dark '>
            {price}
            {/* <span className='text-base font-medium text-body-color '>
              / {subscription}
            </span> */}
          </h2>
          <p className='mb-8 border-b border-stroke pb-8 text-base text-body-color '>
            {description}
          </p>
          <div className='mb-9 flex flex-col gap-[14px]'>{children}</div>
          <Link
            href={buttonLink}
            className={` ${
              active
                ? 'block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90'
                : 'block w-full rounded-md border border-stroke bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white '
            } `}
          >
            {buttonText}
          </Link>
          <div>
            <span className='absolute right-0 top-7 z-[-1]'>
              <svg
                width={77}
                height={172}
                viewBox='0 0 77 172'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx={86} cy={86} r={86} fill='url(#paint0_linear)' />
                <defs>
                  <linearGradient
                    id='paint0_linear'
                    x1={86}
                    y1={0}
                    x2={86}
                    y2={172}
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#dc2626' stopOpacity='0.09' />
                    <stop offset={1} stopColor='#C4C4C4' stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className='absolute right-4 top-4 z-[-1]'>
              <svg
                width={41}
                height={89}
                viewBox='0 0 41 89'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle
                  cx='38.9138'
                  cy='87.4849'
                  r='1.42021'
                  transform='rotate(180 38.9138 87.4849)'
                  fill='#dc2626'
                />
                <circle
                  cx='38.9138'
                  cy='74.9871'
                  r='1.42021'
                  transform='rotate(180 38.9138 74.9871)'
                  fill='#dc2626'
                />
                <circle
                  cx='38.9138'
                  cy='62.4892'
                  r='1.42021'
                  transform='rotate(180 38.9138 62.4892)'
                  fill='#dc2626'
                />
                <circle
                  cx='38.9138'
                  cy='38.3457'
                  r='1.42021'
                  transform='rotate(180 38.9138 38.3457)'
                  fill='#dc2626'
                />
                <circle
                  cx='38.9138'
                  cy='13.634'
                  r='1.42021'
                  transform='rotate(180 38.9138 13.634)'
                  fill='#dc2626'
                />
                <circle
                  cx='38.9138'
                  cy='50.2754'
                  r='1.42021'
                  transform='rotate(180 38.9138 50.2754)'
                  fill='#dc2626'
                />
                <circle
                  cx='38.9138'
                  cy='26.1319'
                  r='1.42021'
                  transform='rotate(180 38.9138 26.1319)'
                  fill='#dc2626'
                />
                <circle
                  cx='38.9138'
                  cy='1.42021'
                  r='1.42021'
                  transform='rotate(180 38.9138 1.42021)'
                  fill='#dc2626'
                />
                <circle
                  cx='26.4157'
                  cy='87.4849'
                  r='1.42021'
                  transform='rotate(180 26.4157 87.4849)'
                  fill='#dc2626'
                />
                <circle
                  cx='26.4157'
                  cy='74.9871'
                  r='1.42021'
                  transform='rotate(180 26.4157 74.9871)'
                  fill='#dc2626'
                />
                <circle
                  cx='26.4157'
                  cy='62.4892'
                  r='1.42021'
                  transform='rotate(180 26.4157 62.4892)'
                  fill='#dc2626'
                />
                <circle
                  cx='26.4157'
                  cy='38.3457'
                  r='1.42021'
                  transform='rotate(180 26.4157 38.3457)'
                  fill='#dc2626'
                />
                <circle
                  cx='26.4157'
                  cy='13.634'
                  r='1.42021'
                  transform='rotate(180 26.4157 13.634)'
                  fill='#dc2626'
                />
                <circle
                  cx='26.4157'
                  cy='50.2754'
                  r='1.42021'
                  transform='rotate(180 26.4157 50.2754)'
                  fill='#dc2626'
                />
                <circle
                  cx='26.4157'
                  cy='26.1319'
                  r='1.42021'
                  transform='rotate(180 26.4157 26.1319)'
                  fill='#dc2626'
                />
                <circle
                  cx='26.4157'
                  cy='1.4202'
                  r='1.42021'
                  transform='rotate(180 26.4157 1.4202)'
                  fill='#dc2626'
                />
                <circle
                  cx='13.9177'
                  cy='87.4849'
                  r='1.42021'
                  transform='rotate(180 13.9177 87.4849)'
                  fill='#dc2626'
                />
                <circle
                  cx='13.9177'
                  cy='74.9871'
                  r='1.42021'
                  transform='rotate(180 13.9177 74.9871)'
                  fill='#dc2626'
                />
                <circle
                  cx='13.9177'
                  cy='62.4892'
                  r='1.42021'
                  transform='rotate(180 13.9177 62.4892)'
                  fill='#dc2626'
                />
                <circle
                  cx='13.9177'
                  cy='38.3457'
                  r='1.42021'
                  transform='rotate(180 13.9177 38.3457)'
                  fill='#dc2626'
                />
                <circle
                  cx='13.9177'
                  cy='13.634'
                  r='1.42021'
                  transform='rotate(180 13.9177 13.634)'
                  fill='#dc2626'
                />
                <circle
                  cx='13.9177'
                  cy='50.2754'
                  r='1.42021'
                  transform='rotate(180 13.9177 50.2754)'
                  fill='#dc2626'
                />
                <circle
                  cx='13.9177'
                  cy='26.1319'
                  r='1.42021'
                  transform='rotate(180 13.9177 26.1319)'
                  fill='#dc2626'
                />
                <circle
                  cx='13.9177'
                  cy='1.42019'
                  r='1.42021'
                  transform='rotate(180 13.9177 1.42019)'
                  fill='#dc2626'
                />
                <circle
                  cx='1.41963'
                  cy='87.4849'
                  r='1.42021'
                  transform='rotate(180 1.41963 87.4849)'
                  fill='#dc2626'
                />
                <circle
                  cx='1.41963'
                  cy='74.9871'
                  r='1.42021'
                  transform='rotate(180 1.41963 74.9871)'
                  fill='#dc2626'
                />
                <circle
                  cx='1.41963'
                  cy='62.4892'
                  r='1.42021'
                  transform='rotate(180 1.41963 62.4892)'
                  fill='#dc2626'
                />
                <circle
                  cx='1.41963'
                  cy='38.3457'
                  r='1.42021'
                  transform='rotate(180 1.41963 38.3457)'
                  fill='#dc2626'
                />
                <circle
                  cx='1.41963'
                  cy='13.634'
                  r='1.42021'
                  transform='rotate(180 1.41963 13.634)'
                  fill='#dc2626'
                />
                <circle
                  cx='1.41963'
                  cy='50.2754'
                  r='1.42021'
                  transform='rotate(180 1.41963 50.2754)'
                  fill='#dc2626'
                />
                <circle
                  cx='1.41963'
                  cy='26.1319'
                  r='1.42021'
                  transform='rotate(180 1.41963 26.1319)'
                  fill='#dc2626'
                />
                <circle
                  cx='1.41963'
                  cy='1.4202'
                  r='1.42021'
                  transform='rotate(180 1.41963 1.4202)'
                  fill='#dc2626'
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const List = ({ children }: { children: React.ReactNode }) => {
  return <p className='text-base text-body-color '>{children}</p>;
};
