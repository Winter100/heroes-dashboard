import type {
  EnchantDetailFormValues,
  EnchantFormValues,
} from '@/schema/enchant-schema';
import type { EnchantStatistics, EnchantType } from '@/types/enchant-type';
import { apiClient } from '@/utils/api-client';

const jsonHeaders = { 'Content-Type': 'application/json' };

export const enchantApi = {
  getStatistics: () => apiClient<EnchantStatistics>('/statistics/enchant'),
  get: async (enchantId: string) =>
    apiClient<EnchantType>(`/enchants/id/${enchantId}`),
  getAll: async () => apiClient<EnchantType[]>('/enchants'),
  create: async (enchantValues: EnchantFormValues) =>
    apiClient('/enchants-admin/create', {
      headers: jsonHeaders,
      method: 'POST',
      body: JSON.stringify(enchantValues),
    }),
  update: async ({
    enchantId,
    enchantValues,
  }: {
    enchantId: string;
    enchantValues: EnchantFormValues;
  }) =>
    apiClient(`/enchants-admin/update/${enchantId}`, {
      headers: jsonHeaders,
      method: 'POST',
      body: JSON.stringify(enchantValues),
    }),
  upsert: async ({
    enchantId,
    enchantValues,
  }: {
    enchantId: string;
    enchantValues: EnchantDetailFormValues;
  }) =>
    apiClient(`/enchants-admin/upsert/${enchantId}`, {
      headers: jsonHeaders,
      method: 'POST',
      body: JSON.stringify(enchantValues),
    }),
  delete: async (enchantId: string) =>
    apiClient(`/enchants-admin/delete/${enchantId}`, { method: 'DELETE' }),
};
