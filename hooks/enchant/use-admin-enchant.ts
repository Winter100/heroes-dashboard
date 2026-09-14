import { enchantApi } from '@/api/api';
import { enchantKeys } from '@/queries/enchant-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  EnchantDetailFormValues,
  EnchantFormValues,
} from '@/schema/enchant-schema';
import { toast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';

export const useAdminCreateEnchant = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: enchantApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enchantKeys.lists() });
      queryClient.invalidateQueries({ queryKey: enchantKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onCreate = (enchantData: EnchantFormValues) => {
    const promise = mutation.mutateAsync(enchantData);

    toast.promise(promise, {
      loading: `${enchantData.name} 생성중...`,
      success: () => {
        return {
          type: 'success',
          title: enchantData.name,
          description: '인챈트가 생성되었습니다.',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: enchantData.name,
          description:
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
    return promise;
  };

  return { onCreate, ...mutation };
};

export const useAdminUpdateEnchant = (enchantId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: enchantApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enchantKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: enchantKeys.detail(enchantId),
      });
      queryClient.invalidateQueries({ queryKey: enchantKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onEdit = (enchantData: EnchantFormValues) => {
    const promise = mutation.mutateAsync({
      enchantId,
      enchantValues: enchantData,
    });

    toast.promise(promise, {
      loading: `${enchantData.name} 수정 중...`,
      success: () => {
        return `${enchantData.name}가 수정되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '수정에 실패했습니다.',
    });
    return promise;
  };

  return { onEdit, ...mutation };
};

export const useAdminUpsertEnchant = (enchantId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (enchantValues: EnchantDetailFormValues) =>
      enchantApi.upsert({ enchantId, enchantValues }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: enchantKeys.detail(enchantId),
      });
      queryClient.invalidateQueries({ queryKey: enchantKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onEdit = (enchantData: EnchantDetailFormValues) => {
    const promise = mutation.mutateAsync(enchantData);

    toast.promise(promise, {
      loading: `변경 중...`,
      success: () => {
        return `변경 되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '변경에 실패했습니다.',
    });

    return promise;
  };

  return { onEdit, ...mutation };
};

export const useAdminDeleteEnchant = (enchantId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => enchantApi.delete(enchantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enchantKeys.lists() });
      queryClient.invalidateQueries({ queryKey: enchantKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onDelete = () => {
    const promise = mutation.mutateAsync();

    toast.promise(promise, {
      loading: `삭제 중...`,
      success: () => {
        router.back();
        return `삭제 되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '삭제에 실패했습니다.',
    });

    return promise;
  };

  return { onDelete, ...mutation };
};
