const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const apiClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const url = `${BACKEND_URL}${endpoint}`;
  const res = await fetch(url, options);

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
