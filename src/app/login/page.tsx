import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { login } from '@/app/login/actions';

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
          <form className='grid gap-4'>
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
            <Button formAction={login} className='w-full'>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
