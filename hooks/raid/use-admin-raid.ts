import { raidApi } from '@/api/api';
import { raidKeys } from '@/queries/raid-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAdminCreateRaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: raidApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: raidKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export const useAdminUpdateRaid = (raidId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => raidApi.update({ formData, raidId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: raidKeys.detail(raidId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export const useAdminUpsertRaidDetail = (raidId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
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
};

export const useAdminDeleteRaid = (raidId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => raidApi.delete(raidId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: raidKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
