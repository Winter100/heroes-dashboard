import { API_KEY, characterApi } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 관리자 전용 Query
export const useAdminCharacter = (classId: string) => {
  const queryClient = useQueryClient();

  const invalidateCharacterList = () => {
    queryClient.invalidateQueries({
      queryKey: [API_KEY.characterList],
    });
    queryClient.invalidateQueries({
      queryKey: [classId, 'skill'],
    });
  };

  const updateMutation = useMutation({
    mutationFn: characterApi.update,
    onSuccess: invalidateCharacterList,
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: characterApi.delete,
    onSuccess: invalidateCharacterList,
    onError: (error) => {
      console.log(error.message);
    },
  });

  return {
    updateMutation,
    deleteMutation,
  };
};
