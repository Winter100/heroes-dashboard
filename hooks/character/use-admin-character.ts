import { characterApi } from '@/api/api';
import { characterKeys } from '@/queries/character-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 관리자 전용 Query
export const useAdminCreateCharacter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: characterApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export const useAdminUpdateCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: characterApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export const useAdminDeleteCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: characterApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export const useAdminCreateSkill = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: characterApi.createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterKeys.skill(classId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export const useAdminUpdateSkill = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: characterApi.updateSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterKeys.skill(classId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export const useAdminDeleteSkill = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: characterApi.deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterKeys.skill(classId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
