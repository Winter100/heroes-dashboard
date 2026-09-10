import { characterApi } from '@/api/api';
import { toast } from '@/components/ui/toast';
import {
  createCharacterFormData,
  createCharacterSkillFormData,
} from '@/lib/utils';
import { characterKeys } from '@/queries/character-keys';
import {
  CharacterFormValues,
  CharacterSkillFormValues,
} from '@/schema/character.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 관리자 전용 Query
export const useAdminCreateCharacter = () => {
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: characterApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterKeys.lists() });
      queryClient.invalidateQueries({ queryKey: characterKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onCreate = (classData: CharacterFormValues, onSuccess?: () => void) => {
    const { name: className } = classData;
    const formData = createCharacterFormData(classData);

    const promise = mutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: `${className} 생성중...`,
      success: () => {
        setCreateOpen(false);
        onSuccess?.();
        return {
          type: 'success',
          title: className,
          description: '직업이 생성되었습니다.',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: className,
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

export const useAdminUpdateCharacter = (classId: string) => {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: characterApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterKeys.lists() });
      queryClient.invalidateQueries({ queryKey: characterKeys.skill(classId) });
      queryClient.invalidateQueries({ queryKey: characterKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onEdit = (classData: CharacterFormValues, onSuccess?: () => void) => {
    const formData = createCharacterFormData(classData);

    const promise = mutation.mutateAsync({ formData, classId });

    toast.promise(promise, {
      loading: `${classData.name} 수정 중...`,
      success: () => {
        setEditOpen(false);
        onSuccess?.();
        return `${classData.name}가 수정되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '수정에 실패했습니다.',
    });
  };

  return { onEdit, editOpen, setEditOpen, ...mutation };
};

export const useAdminDeleteCharacter = (classId: string) => {
  const queryClient = useQueryClient();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: characterApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterKeys.lists() });
      queryClient.invalidateQueries({ queryKey: characterKeys.statistics() });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onDelete = (className: string, onSuccess?: () => void) => {
    const promise = mutation.mutateAsync({ classId, className });

    toast.promise(promise, {
      loading: `${className} 삭제 중...`,
      success: () => {
        setDeleteOpen(false);
        onSuccess?.();
        router.push('/dashboard/character');
        return `${className}가 삭제되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '삭제에 실패했습니다.',
    });
  };

  return { onDelete, deleteOpen, setDeleteOpen, ...mutation };
};

export const useAdminCreateSkill = (classId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: characterApi.createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: characterKeys.skill(classId) });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onCreate = async (
    skill: CharacterSkillFormValues,
    onSuccess?: () => void,
  ) => {
    const { name: skillName } = skill;
    const formData = createCharacterSkillFormData(skill, [classId]);
    const promise = mutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: `${skillName} 등록 중...`,
      success: () => {
        onSuccess?.();
        return {
          type: 'success',
          title: skillName,
          description: '스킬이 등록되었습니다.',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: skillName,
          description:
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
  };

  return { onCreate, isPending: mutation.isPending };
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
