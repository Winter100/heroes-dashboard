import { ItemStepFormValues } from '@/schema/item.schema';
import {
  Character,
  CharacterDetailType,
  Statistics,
} from '@/types/character-type';
import { ItemStepType } from '@/types/item-type';
import { apiClient } from '@/utils/api-client';

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
