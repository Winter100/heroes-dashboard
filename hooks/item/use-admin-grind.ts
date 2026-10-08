import { itemApi } from '@/api/item-api';
import { getErrorMessage, showMutationToast } from '@/lib/mutation-toast';
import { itemKeys } from '@/queries/item-keys';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

export const useAdminGetAllGrind = () => {
  return useSuspenseQuery({
    queryKey: itemKeys.grinds(),
    queryFn: itemApi.getAllGrind,
  });
};

export const useAdminGetGrind = (itemId: string) => {
  return useSuspenseQuery({
    queryKey: itemKeys.grind(itemId),
    queryFn: () => itemApi.getGrind(itemId),
    refetchOnMount: 'always',
  });
};

export const useAdminCreateGrind = (itemId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: itemApi.createGrind,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: itemKeys.grind(itemId) });
      void queryClient.invalidateQueries({ queryKey: itemKeys.detail(itemId) });
    },
  });

  const onCreateGrind = (ids: number[]) => {
    const promise = mutation.mutateAsync({ itemId, ids });
    showMutationToast(promise, {
      loading: '연마 등록 중...',
      success: () => '연마 정보가 등록되었습니다.',
      error: (error) => getErrorMessage(error, '연마 등록에 실패했습니다.'),
    });
    return promise;
  };

  return { onCreateGrind, ...mutation };
};
