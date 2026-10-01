import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { signApi } from '@/api/auth-api';
import { useRouter } from 'next/navigation';
import { SigninFormValues } from '@/schema/sign-schema';
import { toast } from '@/components/ui/toast';

export const useLoginMutation = () => {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: signApi.login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      router.replace('/dashboard');
    },
    onError: (error) => {
      console.error('로그인 에러:', error);
    },
    retry: 0,
  });

  const onSubmit = async (signinData: SigninFormValues) => {
    const mutate = mutation.mutateAsync(signinData);
    toast.promise(mutate, {
      loading: `로그인 중...`,
      success: ({ user }) => {
        return {
          type: 'success',
          title: '로그인 성공',
          description: `안녕하세요. ${user?.name}님`,
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: '로그인',
          description:
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
  };

  return { onSubmit, ...mutation };
};

export const useLogoutMutaion = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const mutation = useMutation({
    mutationFn: signApi.logout,
    onSuccess: () => {
      clearAuth();
      router.replace('/');
    },
    onError: (error) => {
      console.error('로그아웃 에러:', error);
    },
  });

  const onLogout = () => {
    const promise = mutation.mutateAsync();
    toast.promise(promise, {
      loading: `로그아웃 중...`,
      success: () => {
        return {
          type: 'success',
          title: '로그아웃',
          description: '성공했습니다',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: '로그아웃',
          description:
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
  };

  return { onLogout, ...mutation };
};
