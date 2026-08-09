import { CharacterDetailType } from '@/types/character-type';

export const API_KEY = {
  characterList: 'characterList',
};
export const characterApi = {
  get: async () => {
    const res = await fetch('http://localhost:8080/characters');
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },
  findOne: async (classId: string): Promise<CharacterDetailType> => {
    const res = await fetch(`http://localhost:8080/characters/${classId}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },
  create: async (formData: FormData) => {
    const res = await fetch('http://localhost:8080/characters-admin', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },
  update: async (formData: FormData) => {
    const res = await fetch(`http://localhost:8080/characters-admin/update`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },
  delete: async ({ id, name }: { id: string; name: string }) => {
    const res = await fetch(`http://localhost:8080/characters-admin`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({ id, name }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  },

  createSkill: async (formData: FormData) => {
    const res = await fetch(`http://localhost:8080/characters-admin/skill`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },

  updateSkill: async (formData: FormData) => {
    const res = await fetch(
      `http://localhost:8080/characters-admin/skill/update`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },
  deleteSkill: async ({
    skillId,
    classId,
  }: {
    skillId: string;
    classId: string;
  }) => {
    const res = await fetch(
      `http://localhost:8080/characters-admin/skill/delete`,
      {
        method: 'DELETE',
        body: JSON.stringify({ skillId, classId }),
      },
    );
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },
};
