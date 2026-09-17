import type { ItemStepFormValues } from '@/schema/item.schema';
import type { ItemStatistics, ItemStepType } from '@/types/item-type';
import { apiClient } from '@/utils/api-client';

export const itemApi = {
  getStatistics: () => apiClient<ItemStatistics>('/statistics/item'),
  get: async () => apiClient<ItemStepType[]>('/items/all'),
  getStats: async () =>
    apiClient<{ id: string; name: string }[]>('/items-admin/stats'),
  getBasicId: async () =>
    apiClient<{
      category: { id: string; name: string }[];
      tier: { id: string; name: string }[];
      slot: { id: number; name: string; value: string }[];
    }>('/items-admin/basic-id'),
  findOne: async (itemId: string) =>
    apiClient<ItemStepType>(`/items/step/${itemId}`),
  create: async (formData: FormData) =>
    apiClient('/items-admin', { method: 'POST', body: formData }),
  update: async ({
    itemId,
    formData,
  }: {
    itemId: string;
    formData: FormData;
  }) =>
    apiClient(`/items-admin/update/${itemId}`, {
      method: 'POST',
      body: formData,
    }),
  createStep: async ({
    itemId,
    steps,
  }: {
    itemId: string;
    steps: ItemStepFormValues;
  }) =>
    apiClient(`/items-admin/create/step/${itemId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ steps }),
    }),
  updateStep: async ({
    stepId,
    itemId,
    steps,
  }: {
    stepId: string;
    itemId: string;
    steps: ItemStepFormValues;
  }) =>
    apiClient(`/items-admin/update/step/${itemId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ stepId, steps }),
    }),
  deleteStep: async ({ stepId }: { stepId: string }) =>
    apiClient(`/items-admin/delete/step/${stepId}`, { method: 'DELETE' }),
  delete: async (itemId: string) =>
    apiClient(`/items-admin/delete/${itemId}`, { method: 'DELETE' }),
};
