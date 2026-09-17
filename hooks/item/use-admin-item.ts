import { itemApi } from '@/api/item-api';
import { getErrorMessage, showMutationToast } from '@/lib/mutation-toast';
import { createItemFormData } from '@/lib/utils';
import { itemKeys } from '@/queries/item-keys';
import { ItemFormValues, ItemStepFormValues } from '@/schema/item.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAdminCreateItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: itemApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.lists() });
      queryClient.invalidateQueries({ queryKey: itemKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onCreate = (item: ItemFormValues) => {
    const formData = createItemFormData(item);
    const promise = mutation.mutateAsync(formData);
    showMutationToast(promise, {
      loading: `${item.name} 생성중...`,
      success: () => {
        return {
          type: 'success',
          title: item.name,
          description: `${item.name}가 생성되었습니다.`,
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: item.name,
          description:
            getErrorMessage(error, '처리 중 오류가 발생했습니다.'),
        };
      },
    });

    return promise;
  };

  return { onCreate, ...mutation };
};

export const useAdminUpdateItem = (itemId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: itemApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(itemId) });
      queryClient.invalidateQueries({ queryKey: itemKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onEdit = (itemData: ItemFormValues) => {
    const formData = createItemFormData(itemData);

    const promise = mutation.mutateAsync({ formData, itemId });

    showMutationToast(promise, {
      loading: `${itemData.name} 수정 중...`,
      success: () => {
        return `${itemData.name}가 수정되었습니다.`;
      },
      error: (error) => getErrorMessage(error, '수정에 실패했습니다.'),
    });

    return promise;
  };

  return { onEdit, ...mutation };
};
export const useAdminDeleteItem = (itemId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => itemApi.delete(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.lists() });
      queryClient.invalidateQueries({ queryKey: itemKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onDelete = () => {
    const promise = mutation.mutateAsync();

    showMutationToast(promise, {
      loading: `삭제 중...`,
      success: () => {
        router.back();
        return `삭제 되었습니다.`;
      },
      error: (error) => getErrorMessage(error, '삭제에 실패했습니다.'),
    });

    return promise;
  };

  return { onDelete, ...mutation };
};
export const useAdminCreateStep = (itemId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: itemApi.createStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(itemId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onCreateStep = (stepData: ItemStepFormValues) => {
    const promise = mutation.mutateAsync({ steps: stepData, itemId });

    showMutationToast(promise, {
      loading: `${stepData.stepName} 생성 중...`,
      success: () => {
        return `${stepData.stepName}가 생성되었습니다.`;
      },
      error: (error) => getErrorMessage(error, '생성에 실패했습니다.'),
    });
  };

  return { onCreateStep, ...mutation };
};
export const useAdminUpdateStep = (itemId: string, stepId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: itemApi.updateStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(itemId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onEdit = (stepData: ItemStepFormValues) => {
    const promise = mutation.mutateAsync({
      stepId: stepId,
      itemId: itemId,
      steps: stepData,
    });

    showMutationToast(promise, {
      loading: `수정 중...`,
      success: () => {
        return `수정 되었습니다.`;
      },
      error: (error) => getErrorMessage(error, '변경에 실패했습니다.'),
    });

    return promise;
  };

  return { onEdit, ...mutation };
};
export const useAdminDeleteStep = (itemId: string, stepId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: itemApi.deleteStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(itemId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onDelete = () => {
    const promise = mutation.mutateAsync({
      stepId: stepId,
    });

    showMutationToast(promise, {
      loading: `삭제 중...`,
      success: () => {
        return `삭제 되었습니다.`;
      },
      error: (error) => getErrorMessage(error, '삭제에 실패했습니다.'),
    });

    return promise;
  };

  return { onDelete, ...mutation };
};
