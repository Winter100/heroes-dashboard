import { itemApi } from '@/api/api';
import { itemKeys } from '@/queries/item-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAdminCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export const useAdminUpdateItem = (itemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(itemId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export const useAdminDeleteItem = (itemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => itemApi.delete(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.lists() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export const useAdminCreateStep = (itemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemApi.createStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(itemId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export const useAdminUpdateStep = (itemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemApi.updateStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(itemId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
export const useAdminDeleteStep = (itemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemApi.deleteStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(itemId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
