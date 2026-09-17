import { raidApi } from '@/api/raid-api';
import { raidKeys } from '@/queries/raid-keys';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useRaid = () => {
  return useSuspenseQuery({
    queryKey: raidKeys.lists(),
    queryFn: raidApi.getAll,
    retry: 1,
  });
};

export const useRaidDetail = (raidId: string) => {
  return useSuspenseQuery({
    queryKey: raidKeys.detail(raidId),
    queryFn: () => raidApi.get(raidId),
    retry: 1,
  });
};

export const useRaidStatistics = () => {
  return useQuery({
    queryKey: raidKeys.statistics(),
    queryFn: raidApi.getStatistics,
  });
};
