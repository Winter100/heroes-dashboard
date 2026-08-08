import { API_KEY, characterApi } from '@/api/api';
import { toast } from '@/components/ui/toast';
import { characterSchema } from '@/schema/character.schema';
import { Character } from '@/types/character-type';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import z from 'zod';

type MutateOptions = { onSuccess?: () => void };

export const useCharacter = () => {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery<Character[]>({
    queryKey: [API_KEY.characterList],
    queryFn: characterApi.get,
    select: (data) => {
      return [...data].sort((a, b) =>
        a.releaseDate.localeCompare(b.releaseDate),
      );
    },
  });

  const createMutation = useMutation({
    mutationFn: characterApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_KEY.characterList] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: characterApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_KEY.characterList] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: characterApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_KEY.characterList] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onCreate = (
    data: z.infer<typeof characterSchema>,
    id?: number | undefined,
    options?: MutateOptions,
  ) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('gender', data.gender);
    formData.append('releaseDate', data.releaseDate);

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    toast.promise(
      createMutation.mutateAsync(formData).then((res) => {
        options?.onSuccess?.();
        return res;
      }),
      {
        loading: '캐릭터 생성중...',
        success: '성공적으로 등록되었습니다.',
        error: (err) => err.message ?? '등록에 실패했습니다.',
      },
    );
  };

  const onEdit = (
    data: z.infer<typeof characterSchema>,
    id?: number,
    options?: MutateOptions,
  ) => {
    if (!id) {
      toast.add({
        type: 'error',
        description: 'ID 정보가 없습니다',
        priority: 'high',
      });
      return;
    }
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', data.name);
    formData.append('gender', data.gender);
    formData.append('releaseDate', data.releaseDate);

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    toast.promise(
      updateMutation.mutateAsync(formData).then((res) => {
        options?.onSuccess?.();
        return res;
      }),
      {
        loading: `${data.name} 수정 중...`,
        success: '성공적으로 수정되었습니다!',
        error: (err) => err.message ?? '수정에 실패했습니다.',
      },
    );
  };

  const onDelete = (name?: string, id?: number, options?: MutateOptions) => {
    if (!id || !name) return;

    toast.promise(
      deleteMutation.mutateAsync({ id: id.toString(), name }).then((res) => {
        options?.onSuccess?.();
        return res;
      }),
      {
        loading: `${name} 삭제 중...`,
        success: '성공적으로 삭제되었습니다!',
        error: (err) => err.message ?? '삭제에 실패했습니다.',
      },
    );
  };

  return { data, onCreate, onEdit, onDelete };
};
