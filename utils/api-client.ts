import { useAuthStore, type User } from '@/store/useAuthStore';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
export const REVALIDATE = process.env.NEXT_PUBLIC_REVALIDATE!;

export type AuthSession = {
  accessToken: string;
  user: User;
};

let refreshPromise: Promise<AuthSession> | null = null;

const isUser = (value: unknown): value is User =>
  typeof value === 'object' &&
  value !== null &&
  'name' in value &&
  typeof value.name === 'string' &&
  'role' in value &&
  (value.role === 'ADMIN' || value.role === 'USER');

const isAuthSession = (value: unknown): value is AuthSession =>
  typeof value === 'object' &&
  value !== null &&
  'accessToken' in value &&
  typeof value.accessToken === 'string' &&
  'user' in value &&
  isUser(value.user);

const requestSessionRefresh = async (): Promise<AuthSession> => {
  const { setAccessToken, setUser, clearAuth } = useAuthStore.getState();

  try {
    const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('토큰 재발급에 실패했습니다.');
    }

    const data: unknown = await res.json();

    if (!isAuthSession(data)) {
      throw new Error('인증 응답 형식이 올바르지 않습니다.');
    }

    setAccessToken(data.accessToken);
    setUser(data.user);

    return data;
  } catch (error) {
    try {
      await fetch(`${BACKEND_URL}/auth/signout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}

    clearAuth();
    window.location.replace('/');

    throw error instanceof Error
      ? error
      : new Error('토큰 재발급에 실패했습니다.');
  }
};

export const refreshSession = (): Promise<AuthSession> => {
  if (!refreshPromise) {
    refreshPromise = requestSessionRefresh().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const { accessToken } = useAuthStore.getState();

  const request = async (token?: string) => {
    const headers = new Headers(options.headers);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });
  };

  let res = await request(accessToken ?? '');

  if (res.status === 401) {
    const { accessToken: newAccessToken } = await refreshSession();

    res = await request(newAccessToken);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const text = await res.text();

  let data: unknown;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!res.ok) {
    const message =
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string'
        ? data.message
        : '요청 처리 중 오류가 발생했습니다.';

    throw new Error(message);
  }

  return data as T;
};

export const loginApiClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const url = `${BACKEND_URL}${endpoint}`;
  const res = await fetch(url, { credentials: 'include', ...options });

  if (res.status === 204) {
    return undefined as T;
  }

  const text = await res.text();

  let data;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!res.ok) {
    throw new Error(data?.message ?? '요청 처리 중 오류가 발생했습니다.');
  }

  return data as T;
};
