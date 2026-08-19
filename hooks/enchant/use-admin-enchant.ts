import { enchantApi } from '@/api/api';
import { enchantKeys } from '@/queries/enchant-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EnchantDetailFormValues } from '@/schema/enchant-schema';

export const useAdminCreateEnchant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enchantApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enchantKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export const useAdminUpdateEnchant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enchantApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enchantKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export const useAdminUpsertEnchant = (enchantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (enchantValues: EnchantDetailFormValues) =>
      enchantApi.upsert({ enchantId, enchantValues }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enchantKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export const useAdminDeleteEnchant = (enchantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => enchantApi.delete(enchantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enchantKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
