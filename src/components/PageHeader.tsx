export default function PageHeader({
  title,
  description,
  subDescription,
  image,
}: {
  title: string;
  description: string;
  subDescription?: string;
  image?: string;
}) {
  return (
    <div className='relative bg-red-700'>
      <div className='absolute inset-0'>
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='w-full h-full object-cover object-center'
          src={
            image ??
            'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100'
          }
          alt='page header image'
        />
        <div
          className='absolute inset-0 bg-red-700 mix-blend-multiply'
          aria-hidden='true'
        />
      </div>
      <div className='relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl'>
          {title}
        </h1>
        <p className='mt-6 text-xl text-indigo-100 max-w-3xl'>{description}</p>
        {subDescription && (
          <p className='mt-6 text-xl text-indigo-100 max-w-3xl'>
            {subDescription}
          </p>
        )}
      </div>
    </div>
  );
}
