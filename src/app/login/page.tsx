'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, useTransition } from 'react';

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

import { login } from '@/app/login/actions';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });

      setIsLoading(false);
      router.replace('/login', undefined);
    }
  }, [error, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    startTransition(() => login(formData));
  };

  return (
    <form className='grid gap-4' onSubmit={handleSubmit}>
      <div className='grid gap-2'>
        <label htmlFor='email'>Email</label>
        <Input
          id='email'
          name='email'
          type='email'
          placeholder='m@example.com'
          required
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='password'>Password:</Label>
        <Input id='password' name='password' type='password' required />
      </div>
      <Button
        type='submit'
        className='w-full'
        disabled={isLoading || isPending}
      >
        {isLoading || isPending ? <Spinner /> : 'Login'}
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className='w-full min-h-screen'>
      <div className='flex items-center justify-center py-12 min-h-screen'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account
            </p>
          </div>
          <Suspense fallback={<Spinner />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
