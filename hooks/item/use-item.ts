import { itemApi } from '@/api/api';
import { itemKeys } from '@/queries/item-keys';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useItem = () => {
  return useSuspenseQuery({
    queryKey: itemKeys.lists(),
    queryFn: itemApi.get,
    retry: 1,
  });
};

export const useItemDetail = (id: string) => {
  return useSuspenseQuery({
    queryKey: itemKeys.detail(id),
    queryFn: () => itemApi.findOne(id),
    retry: 1,
  });
};

export const useStats = () => {
  return useQuery({
    queryKey: itemKeys.stats(),
    queryFn: () => itemApi.getStats(),
    retry: 1,
  });
};

export const useNeedItemBasicId = () => {
  return useSuspenseQuery({
    queryKey: itemKeys.basicId(),
    queryFn: () => itemApi.getBasicId(),
  });
};

export const useItemStatistics = () => {
  return useSuspenseQuery({
    queryKey: itemKeys.statistics(),
    queryFn: itemApi.getStatistics,
  });
};
