import { Character } from '@/app/dashboard/character/page';
import { characterSchema } from '@/schema/character.schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import z from 'zod';

const characterApi = {
  create: async (formData: FormData) => {
    const res = await fetch('http://localhost:8080/characters-admin', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.text();
  },

  update: async (formData: FormData) => {
    const res = await fetch(`http://localhost:8080/characters-admin/update`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.text();
  },
};

export const useCharacter = () => {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery<Character[]>({
    queryKey: ['characters-list'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/characters');
      return response.json();
    },
    select: (data) => {
      return data.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
    },
  });

  const createMutation = useMutation({
    mutationFn: characterApi.create,
    onSuccess: () => {
      alert('성공적으로 등록되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['characters-list'] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const updateMutation = useMutation({
    mutationFn: characterApi.update,
    onSuccess: () => {
      alert('성공적으로 등록되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['characters-list'] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onCreate = (data: z.infer<typeof characterSchema>) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('gender', data.gender);
    formData.append('releaseDate', data.releaseDate);

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    createMutation.mutate(formData);
  };

  const onEdit = (data: z.infer<typeof characterSchema>) => {
    const formData = new FormData();
    if (!data.id) return;
    formData.append('id', data?.id?.toString());
    formData.append('name', data.name);
    formData.append('gender', data.gender);
    formData.append('releaseDate', data.releaseDate);

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }
    updateMutation.mutate(formData);
  };

  return { isLoading, data, onCreate, onEdit };
};
