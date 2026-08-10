import { API_KEY, characterApi } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAdminCreateCharacter = () => {
  const queryClient = useQueryClient();

  const invalidateCharacterList = () => {
    queryClient.invalidateQueries({
      queryKey: [API_KEY.characterList],
    });
  };

  return useMutation({
    mutationFn: characterApi.create,
    onSuccess: invalidateCharacterList,
    onError: (error) => {
      console.log(error.message);
    },
  });
};
