import { itemApi } from '@/api/api';
import { itemKeys } from '@/queries/item-keys';
import { useQuery } from '@tanstack/react-query';

export const useItem = () => {
  return useQuery({
    queryKey: itemKeys.lists(),
    queryFn: itemApi.get,
    retry: 1,
  });
};

export const useItemDetail = (id: string) => {
  return useQuery({
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
