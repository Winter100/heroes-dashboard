import { raidApi } from '@/api/api';
import { raidKeys } from '@/queries/raid-keys';
import { useQuery } from '@tanstack/react-query';

export const useRaid = () => {
  return useQuery({
    queryKey: raidKeys.lists(),
    queryFn: raidApi.getAll,
    retry: 1,
  });
};

export const useRaidDetail = (raidId: string) => {
  return useQuery({
    enabled: !!raidId,
    queryKey: raidKeys.detail(raidId),
    queryFn: () => raidApi.get(raidId),
    retry: 1,
  });
};
