import {
  EnchantDetailFormValues,
  EnchantFormValues,
} from '@/schema/enchant-schema';
import { ItemStepFormValues } from '@/schema/item.schema';
import {
  Character,
  CharacterDetailType,
  Statistics,
} from '@/types/character-type';
import { EnchantType } from '@/types/enchant-type';
import { ItemStepType } from '@/types/item-type';
import { RaidType } from '@/types/raid-type';
import { apiClient, loginApiClient } from '@/utils/api-client';

// 추후 토큰이 들어가야함
export const characterApi = {
  get: async () => apiClient<Character[]>(`/characters`),
  getStatistics: async () => apiClient<Statistics>(`/characters/statistics`),
  findOne: async (classId: string) =>
    apiClient<CharacterDetailType>(`/characters/${classId}`),

  create: async (formData: FormData) =>
    apiClient(`/characters-admin`, {
      method: 'POST',
      body: formData,
    }),
  update: async ({
    formData,
    classId,
  }: {
    formData: FormData;
    classId: string;
  }) =>
    apiClient(`/characters-admin/update/${classId}`, {
      method: 'POST',
      body: formData,
    }),

  delete: async ({
    classId,
    className,
  }: {
    classId: string;
    className: string;
  }) =>
    apiClient(`/characters-admin/${classId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({ className }),
    }),

  createSkill: async (formData: FormData) =>
    apiClient(`/characters-admin/skill`, {
      method: 'POST',
      body: formData,
    }),

  updateSkill: async ({
    formData,
    skillId,
  }: {
    formData: FormData;
    skillId: string;
  }) =>
    apiClient(`/characters-admin/skill/update/${skillId}`, {
      method: 'POST',
      body: formData,
    }),
  deleteSkill: async ({
    skillId,
    classId,
  }: {
    skillId: string;
    classId: string;
  }) =>
    apiClient(`/characters-admin/skill/delete/${skillId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({ classId }),
    }),
};

export const itemApi = {
  get: async () => apiClient<ItemStepType[]>(`/items/all`),
  getStats: async () =>
    apiClient<{ id: string; name: string }[]>(`/items-admin/stats`),
  getSlots: async () =>
    apiClient<{ id: number; name: string; value: string }[]>(
      `/items-admin/slots`,
    ),
  getBasicId: async () =>
    apiClient<{
      category: { id: string; name: string }[];
      tier: { id: string; name: string }[];
      slot: { id: number; name: string; value: string }[];
    }>(`/items-admin/basic-id`),
  findOne: async (itemId: string) =>
    apiClient<ItemStepType>(`/items/step/${itemId}`),
  create: async (formData: FormData) =>
    apiClient(`/items-admin`, { method: 'POST', body: formData }),
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
      headers: {
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ stepId, steps }),
    }),
  deleteStep: async ({ stepId }: { stepId: string }) =>
    apiClient(`/items-admin/delete/step/${stepId}`, {
      method: 'DELETE',
    }),
  delete: async (itemId: string) =>
    apiClient(`/items-admin/delete/${itemId}`, {
      method: 'DELETE',
    }),
};

export const enchantApi = {
  get: async (enchantId: string) =>
    apiClient<EnchantType>(`/enchants/${enchantId}`),
  getAll: async () => apiClient<EnchantType[]>(`/enchants`),
  create: async (enchantValues: EnchantFormValues) =>
    apiClient(`/enchants-admin/create`, {
      headers: {
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Content-Type': 'application/json',
      },
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
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(enchantValues),
    }),
  delete: async (enchantId: string) =>
    apiClient(`/enchants-admin/delete/${enchantId}`, {
      method: 'DELETE',
    }),
};

export const raidApi = {
  get: async (raidId: string) => apiClient<RaidType>(`/raids/${raidId}`),
  getAll: async () => apiClient<RaidType[]>(`/raids`),
  create: async (formData: FormData) =>
    apiClient(`/raids-admin/create`, {
      method: 'POST',
      body: formData,
    }),
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
    apiClient(`/raids-admin/delete/${raidId}`, {
      method: 'DELETE',
    }),
  upsert: async (
    raidId: string,
    data: {
      mode: string;
      effects: {
        id: number;
        stat_value: string;
      }[];
    },
  ) =>
    apiClient(`/raids-admin/detail-upsert/${raidId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const signApi = {
  login: async ({ email, password }: { email: string; password: string }) =>
    loginApiClient<{ accessToken: string }>(`/auth/signin`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};
