import { enchantApi } from '@/api/api';
import { enchantKeys } from '@/queries/enchant-keys';
import { EnchantType } from '@/types/enchant-type';
import { useQuery } from '@tanstack/react-query';

export const useEnchant = () => {
  return useQuery({
    queryKey: enchantKeys.lists(),
    queryFn: enchantApi.getAll,
  });
};

export const useEnchantDetail = (enchantId: string) => {
  return useQuery<EnchantType>({
    queryKey: enchantKeys.detail(enchantId),
    queryFn: () => enchantApi.get(enchantId),
  });
};
