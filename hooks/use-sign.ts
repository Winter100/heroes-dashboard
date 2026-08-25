import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { signApi } from '@/api/api';
import { useRouter } from 'next/navigation';

export const useLoginMutation = () => {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: signApi.login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      router.replace('/dashboard');
    },
    onError: (error) => {
      console.error('로그인 에러:', error);
    },
    retry: 0,
  });
};

export const useLogoutMutaion = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: signApi.logout,
    onSuccess: () => {
      clearAuth();
      router.replace('/');
    },
    onError: (error) => {
      console.error('로그아웃 에러:', error);
    },
  });
};
