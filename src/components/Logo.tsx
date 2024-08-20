import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/' className='flex items-center space-x-2'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src='/images/logo2.svg' alt='logo' className='h-12' />
      {/* <RiCarFill className='text-primary' size={32} />
      <h1 className='font-bold text-lg'>Drive 2 Learn</h1> */}
    </Link>
  );
};
