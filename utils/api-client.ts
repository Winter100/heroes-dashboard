import { useAuthStore } from '@/store/useAuthStore';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

type RefreshResponse = {
  accessToken: string;
};

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const { setAccessToken, clearAuth } = useAuthStore.getState();

  try {
    const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('토큰 재발급에 실패했습니다.');
    }

    const data = (await res.json()) as RefreshResponse;

    setAccessToken(data.accessToken);

    return data.accessToken;
  } catch (error) {
    clearAuth();
    throw error;
  }
};

const getNewAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
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
    const newAccessToken = await getNewAccessToken();

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
