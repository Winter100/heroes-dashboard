import {
  Character,
  CharacterDetailType,
  Statistics,
} from '@/types/character-type';
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
