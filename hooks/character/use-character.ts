import { characterApi } from '@/api/api';
import { characterKeys } from '@/queries/character-keys';
import { Character } from '@/types/character-type';
import { useQuery } from '@tanstack/react-query';

export const useCharacter = () => {
  return useQuery<Character[]>({
    queryKey: characterKeys.lists(),
    queryFn: characterApi.get,
    retry: 1,
    select: (data) => {
      return [...data].sort((a, b) =>
        a.releaseDate.localeCompare(b.releaseDate),
      );
    },
  });
};

export const useCharacterSkillList = (classId: string) => {
  return useQuery({
    queryKey: characterKeys.skill(classId),
    queryFn: () => characterApi.findOne(classId),
    retry: 1,
  });
};

export const useCharacterStatistics = () => {
  return useQuery({
    queryKey: characterKeys.statistics(),
    queryFn: characterApi.getStatistics,
    retry: 1,
  });
};
