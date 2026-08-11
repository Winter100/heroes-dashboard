import { CharacterDetailType } from '@/types/character-type';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
export const API_KEY = {
  characterList: 'characterList',
};

export const characterApi = {
  get: async () => {
    const res = await fetch(`${BACKEND_URL}/characters`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },
  findOne: async (classId: string): Promise<CharacterDetailType> => {
    const res = await fetch(`${BACKEND_URL}/characters/${classId}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },
  create: async (formData: FormData) => {
    const res = await fetch(`${BACKEND_URL}/characters-admin`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },
  update: async ({
    formData,
    classId,
  }: {
    formData: FormData;
    classId: string;
  }) => {
    const res = await fetch(
      `${BACKEND_URL}/characters-admin/update/${classId}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  },
  delete: async ({
    classId,
    className,
  }: {
    classId: string;
    className: string;
  }) => {
    const res = await fetch(`${BACKEND_URL}/characters-admin/${classId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({ className }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  },

  createSkill: async <T>(formData: FormData): Promise<T> => {
    const res = await fetch(`${BACKEND_URL}/characters-admin/skill`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(error?.message ?? '요청 처리 중 오류가 발생했습니다.');
    }

    if (res.status === 204) {
      return undefined as T;
    }

    const text = await res.text();
    return text ? JSON.parse(text) : (undefined as T);
  },

  updateSkill: async <T>({
    formData,
    skillId,
  }: {
    formData: FormData;
    skillId: string;
  }): Promise<T> => {
    const res = await fetch(
      `${BACKEND_URL}/characters-admin/skill/update/${skillId}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(error?.message ?? '요청 처리 중 오류가 발생했습니다.');
    }

    if (res.status === 204) {
      return undefined as T;
    }

    const text = await res.text();
    return text ? JSON.parse(text) : (undefined as T);
  },
  deleteSkill: async ({
    skillId,
    classId,
  }: {
    skillId: string;
    classId: string;
  }) => {
    // 직업과 스킬의 연결끊기
    const res = await fetch(
      `${BACKEND_URL}/characters-admin/skill/delete/${skillId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
        body: JSON.stringify({ classId }),
      },
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  },
};
