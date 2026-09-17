import type { RaidStatistics, RaidType } from '@/types/raid-type';
import { apiClient } from '@/utils/api-client';

type RaidDetailInput = {
  mode: string;
  effects: {
    id: number;
    stat_value: string;
  }[];
};

export const raidApi = {
  getStatistics: () => apiClient<RaidStatistics>('/statistics/raid'),
  get: async (raidId: string) => apiClient<RaidType>(`/raids/id/${raidId}`),
  getAll: async () => apiClient<RaidType[]>('/raids'),
  create: async (formData: FormData) =>
    apiClient('/raids-admin/create', { method: 'POST', body: formData }),
  update: async ({
    formData,
    raidId,
  }: {
    formData: FormData;
    raidId: string;
  }) =>
    apiClient(`/raids-admin/update/${raidId}`, {
      method: 'POST',
      body: formData,
    }),
  delete: async (raidId: string) =>
    apiClient(`/raids-admin/delete/${raidId}`, { method: 'DELETE' }),
  upsert: async (raidId: string, data: RaidDetailInput) =>
    apiClient(`/raids-admin/detail-upsert/${raidId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
