import { raidApi } from '@/api/api';
import { toast } from '@/components/ui/toast';
import { createRaidFormData } from '@/lib/utils';
import { raidKeys } from '@/queries/raid-keys';
import { RaidEffectsFormValues, RaidFormValues } from '@/schema/raid-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useAdminCreateRaid = () => {
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
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
    toast.promise(promise, {
      loading: `${raidData.battle} 생성중...`,
      success: () => {
        setCreateOpen(false);
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
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
  };

  return { onCreate, createOpen, setCreateOpen, ...mutation };
};

export const useAdminUpdateRaid = (raidId: string) => {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
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

    toast.promise(promise, {
      loading: `${raidData.battle} 수정 중...`,
      success: () => {
        setEditOpen(false);
        return `${raidData.battle}가 수정되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '수정에 실패했습니다.',
    });
  };

  return { onEdit, editOpen, setEditOpen, ...mutation };
};

export const useAdminUpsertRaidDetail = (raidId: string) => {
  const queryClient = useQueryClient();
  const [stepEditOpen, setStepEditOpen] = useState(false);
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
    if (boss.effects.length === 0) return;
    const upsertData = {
      mode,
      effects: boss.effects,
    };
    const promise = mutation.mutateAsync(upsertData);

    toast.promise(promise, {
      loading: `변경 중...`,
      success: () => {
        return `변경 되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '변경에 실패했습니다.',
    });
  };

  return { onUpsert, stepEditOpen, setStepEditOpen, ...mutation };
};

export const useAdminDeleteRaid = (raidId: string) => {
  const queryClient = useQueryClient();
  const [deleteOpen, setDeleteOpen] = useState(false);
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

    toast.promise(promise, {
      loading: `삭제 중...`,
      success: () => {
        setDeleteOpen(false);
        router.push('/dashboard/raid');
        return `삭제 되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '삭제에 실패했습니다.',
    });
  };

  return { onDelete, deleteOpen, setDeleteOpen, ...mutation };
};
