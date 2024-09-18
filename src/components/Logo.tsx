import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/' className='flex items-center space-x-2'>
      <Image
        src='/images/logo2.svg'
        alt='logo'
        className='h-12'
        width={200}
        height={48}
        priority
      />
      {/* <RiCarFill className='text-primary' size={32} />
      <h1 className='font-bold text-lg'>Drive 2 Learn</h1> */}
    </Link>
  );
};
