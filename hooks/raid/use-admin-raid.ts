import { raidApi } from '@/api/raid-api';
import { getErrorMessage, showMutationToast } from '@/lib/mutation-toast';
import { createRaidFormData } from '@/lib/utils';
import { raidKeys } from '@/queries/raid-keys';
import { RaidEffectsFormValues, RaidFormValues } from '@/schema/raid-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAdminCreateRaid = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: raidApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: raidKeys.lists() });
      queryClient.invalidateQueries({ queryKey: raidKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onCreate = (raidData: RaidFormValues) => {
    const formData = createRaidFormData(raidData);
    const promise = mutation.mutateAsync(formData);
    showMutationToast(promise, {
      loading: `${raidData.battle} 생성중...`,
      success: () => {
        return {
          type: 'success',
          title: raidData.battle,
          description: '레이드가 생성되었습니다.',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: raidData.battle,
          description:
            getErrorMessage(error, '처리 중 오류가 발생했습니다.'),
        };
      },
    });
    return promise;
  };

  return { onCreate, ...mutation };
};

export const useAdminUpdateRaid = (raidId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData: FormData) => raidApi.update({ formData, raidId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: raidKeys.detail(raidId) });
      queryClient.invalidateQueries({ queryKey: raidKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onEdit = (raidData: RaidFormValues) => {
    const formData = createRaidFormData(raidData);
    const promise = mutation.mutateAsync(formData);

    showMutationToast(promise, {
      loading: `${raidData.battle} 수정 중...`,
      success: () => {
        return `${raidData.battle}가 수정되었습니다.`;
      },
      error: (error) => getErrorMessage(error, '수정에 실패했습니다.'),
    });

    return promise;
  };

  return { onEdit, ...mutation };
};

export const useAdminUpsertRaidDetail = (raidId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: {
      mode: string;
      effects: {
        id: number;
        stat_value: string;
      }[];
    }) => raidApi.upsert(raidId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: raidKeys.detail(raidId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onUpsert = (mode: string, boss: RaidEffectsFormValues) => {
    const upsertData = {
      mode,
      effects: boss.effects,
    };
    const promise = mutation.mutateAsync(upsertData);

    showMutationToast(promise, {
      loading: `변경 중...`,
      success: () => {
        return `변경 되었습니다.`;
      },
      error: (error) => getErrorMessage(error, '변경에 실패했습니다.'),
    });

    return promise;
  };

  return { onUpsert, ...mutation };
};

export const useAdminDeleteRaid = (raidId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => raidApi.delete(raidId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: raidKeys.lists() });
      queryClient.invalidateQueries({ queryKey: raidKeys.statistics() });
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
        router.push('/dashboard/raid');
        return `삭제 되었습니다.`;
      },
      error: (error) => getErrorMessage(error, '삭제에 실패했습니다.'),
    });

    return promise;
  };

  return { onDelete, ...mutation };
};
