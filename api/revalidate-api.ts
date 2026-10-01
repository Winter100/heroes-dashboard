import type { RevalidateTag } from '@/constant/constant';
import { apiClient, REVALIDATE } from '@/utils/api-client';

type RevalidateRequest = {
  tag: RevalidateTag;
  id?: string;
};

export const revalidateApi = {
  request: async ({ tag, id }: RevalidateRequest): Promise<unknown> =>
    apiClient('/revalidate', {
      body: JSON.stringify({ tag, id }),
      headers: {
        'Content-Type': 'application/json',
        'revalidate-secret': REVALIDATE,
      },
      method: 'POST',
    }),
};
