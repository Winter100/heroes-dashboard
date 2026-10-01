'use client';
import { LoginForm } from '@/components/login-form';
import { useLoginMutation } from '@/hooks/use-sign';

export default function Home() {
  const { onSubmit, isPending } = useLoginMutation();

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm handleSubmit={onSubmit} isPending={isPending} />
      </div>
    </div>
  );
}
