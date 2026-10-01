import { User } from '@/store/useAuthStore';
import { loginApiClient } from '@/utils/api-client';

export const signApi = {
  login: async ({ email, password }: { email: string; password: string }) =>
    loginApiClient<{ accessToken: string; user: User }>('/auth/signin', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: async () =>
    loginApiClient('/auth/signout', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }),
};
