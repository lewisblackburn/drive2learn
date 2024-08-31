import Spinner from '@/components/Spinner';

export default function PageLoader() {
  return (
    <div className='flex w-screen h-screen items-center justify-center'>
      <Spinner />
    </div>
  );
}
