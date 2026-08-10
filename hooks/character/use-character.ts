import { API_KEY, characterApi } from '@/api/api';
import { Character } from '@/types/character-type';
import { useQuery } from '@tanstack/react-query';

export const useCharacter = () => {
  return useQuery<Character[]>({
    queryKey: [API_KEY.characterList],
    queryFn: characterApi.get,
    retry: 1,
    select: (data) => {
      return [...data].sort((a, b) =>
        a.releaseDate.localeCompare(b.releaseDate),
      );
    },
  });
};
