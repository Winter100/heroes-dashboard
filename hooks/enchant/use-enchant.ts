import { enchantApi } from '@/api/enchant-api';
import { enchantKeys } from '@/queries/enchant-keys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useEnchant = () => {
  return useSuspenseQuery({
    queryKey: enchantKeys.lists(),
    queryFn: enchantApi.getAll,
  });
};

export const useEnchantDetail = (enchantId: string) => {
  return useSuspenseQuery({
    queryKey: enchantKeys.detail(enchantId),
    queryFn: () => enchantApi.get(enchantId),
  });
};

export const useEnchantStatistics = () => {
  return useSuspenseQuery({
    queryKey: enchantKeys.statistics(),
    queryFn: enchantApi.getStatistics,
  });
};
