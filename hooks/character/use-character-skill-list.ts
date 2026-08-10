import { characterApi } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export const useCharacterSkillList = (classId: string) => {
  return useQuery({
    queryKey: [classId, 'skill'],
    queryFn: () => characterApi.findOne(classId),
    retry: 1,
  });
};
