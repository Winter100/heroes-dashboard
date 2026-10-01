'use client';

import { Loader2Icon } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

import { useAuthStore } from '@/store/useAuthStore';
import { refreshSession } from '@/utils/api-client';

type AuthInitializationStatus = 'loading' | 'ready' | 'failed';

const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AuthInitializationStatus>(() => {
    const { accessToken, user } = useAuthStore.getState();

    return accessToken && user ? 'ready' : 'loading';
  });

  useEffect(() => {
    if (status !== 'loading') {
      return;
    }

    let isActive = true;

    void refreshSession()
      .then(() => {
        if (isActive) {
          setStatus('ready');
        }
      })
      .catch(() => {
        if (isActive) {
          setStatus('failed');
        }
      });

    return () => {
      isActive = false;
    };
  }, [status]);

  if (status === 'loading') {
    return (
      <div
        className='flex min-h-svh items-center justify-center gap-2 text-muted-foreground'
        role='status'
        aria-live='polite'
      >
        <Loader2Icon className='size-5 animate-spin' aria-hidden='true' />
        <span>로그인 정보를 확인하고 있습니다.</span>
      </div>
    );
  }

  if (status === 'failed') {
    return null;
  }

  return children;
};

export default AuthInitializer;
