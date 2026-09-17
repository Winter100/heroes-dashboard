import { characterApi } from '@/api/character-api';
import { characterKeys } from '@/queries/character-keys';
import { Character } from '@/types/character-type';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useCharacter = () => {
  return useSuspenseQuery<Character[]>({
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
  return useSuspenseQuery({
    queryKey: characterKeys.skill(classId),
    queryFn: () => characterApi.findOne(classId),
    retry: 1,
  });
};

export const useCharacterStatistics = () => {
  return useSuspenseQuery({
    queryKey: characterKeys.statistics(),
    queryFn: characterApi.getStatistics,
    retry: 1,
  });
};
