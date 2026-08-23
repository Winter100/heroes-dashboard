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
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('로그인 에러:', error);
    },
    retry: 1,
  });
};
