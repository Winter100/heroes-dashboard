'use client';

import { characterApi } from '@/api/api';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { formatDate, getDaysSince } from '@/lib/utils';
import ChracterEditSkill from './character-edit-skill';
import { characterSkillSchema } from '@/schema/character.schema';
import CharacterSkillCard from './character-skill-card';
import z from 'zod';
import { toast } from '../ui/toast';

// 같은 스킬을 다른 클래스도 쓰는 경우가 있음
const CharacterDetail = ({ id }: { id: string }) => {
  const queryClient = new QueryClient();
  const { isLoading, data } = useQuery({
    queryKey: [id, 'class'],
    queryFn: () => characterApi.findOne(id),
  });

  const createSkillMutation = useMutation({
    mutationFn: characterApi.createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [id, 'class'] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const updateSkillMutation = useMutation({
    mutationFn: characterApi.updateSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [id, 'class'] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const deleteSkillMutation = useMutation({
    mutationFn: characterApi.deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [id, 'class'] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  if (!data) {
    return <div>캐릭터 정보가 없습니다.</div>;
  }

  const onSubmit = async (
    values: z.infer<typeof characterSkillSchema>,
    mode: 'create' | 'update',
    optional?: () => void,
  ) => {
    const formData = new FormData();

    formData.append('className', data.name);
    formData.append('name', values.name);
    formData.append('description', values.description);

    if (values.image) {
      formData.append('image', values.image);
    }

    try {
      if (mode === 'create') {
        await createSkillMutation.mutateAsync(formData);
      } else {
        await updateSkillMutation.mutateAsync(formData);
      }

      toast.add({
        type: 'success',
        title: values.name,
        description: mode === 'create' ? `등록되었습니다.` : `수정되었습니다.`,
      });

      optional?.();
    } catch (error) {
      toast.add({
        type: 'error',
        title: values.name,
        description: `실패`,
      });
      console.error(error);
    }
  };

  const onDelete = async (skillName: string, skillId: number) => {
    const deleteData = {
      skillId: skillId.toString(),
      classId: data.id.toString(),
    };
    try {
      await deleteSkillMutation.mutateAsync(deleteData);
      toast.add({
        type: 'success',
        title: skillName,
        description: '삭제 되었습니다',
      });
    } catch (error) {
      toast.add({
        type: 'error',
        title: skillName,
        description: `실패`,
      });
      console.error(error);
    }
  };

  if (isLoading) return <div>로딩 테스트</div>;

  return (
    <div className='border gap-4 p-6 flex-col border-red-300 max-w3xl mx-auto flex items-center'>
      <div className='flex items-center gap-2 h-72'>
        <div className='w-48 h-full border border-blue-300'>이미지</div>
        <div className='border h-full'>
          <p>직업명: {data?.name}</p>
          <p>성별: {data?.gender}</p>
          <p>출시일: {formatDate(data?.releaseDate ?? '')}</p>
          <p>
            출시일로부터:{' '}
            {getDaysSince(data?.releaseDate ?? '').toLocaleString()}
          </p>
          <p>스킬수: {data?.skills.length}</p>
        </div>
      </div>

      <div className='grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 w-full'>
        {data?.skills.map((skill) => (
          <CharacterSkillCard
            key={skill.name}
            onSubmit={onSubmit}
            onDelete={onDelete}
            {...skill}
          />
        ))}
        <ChracterEditSkill
          onSubmit={onSubmit}
          mode='create'
          onCancel={() => {}}
        />
      </div>
    </div>
  );
};

export default CharacterDetail;
