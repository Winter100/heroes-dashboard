import { characterApi } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAdminCharacterSkill = (classId: string) => {
  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [classId, 'skill'] });
  };

  const createSkillMutation = useMutation({
    mutationFn: characterApi.createSkill<Promise<void>>,
    onSuccess: invalidateQuery,
    onError: (error) => {
      console.log(error.message);
    },
  });
  const updateSkillMutation = useMutation({
    mutationFn: characterApi.updateSkill<Promise<void>>,
    onSuccess: invalidateQuery,
    onError: (error) => {
      console.log(error.message);
    },
  });
  const deleteSkillMutation = useMutation({
    mutationFn: characterApi.deleteSkill,
    onSuccess: invalidateQuery,
    onError: (error) => {
      console.log(error.message);
    },
  });

  return {
    createSkillMutation,
    updateSkillMutation,
    deleteSkillMutation,
  };
};
