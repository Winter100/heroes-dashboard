'use client';

import {
  createCharacterFormData,
  createCharacterSkillFormData,
} from '@/lib/utils';
import { Button } from '../ui/button';
import {
  CharacterFormValues,
  CharacterSkillFormValues,
} from '@/schema/character.schema';
import { toast } from '../ui/toast';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CharacterEditForm from './character-edit-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useAdminCreateSkill,
  useAdminDeleteCharacter,
  useAdminUpdateCharacter,
} from '@/hooks/character/use-admin-character';
import { useCharacterSkillList } from '@/hooks/character/use-character';
import QueryError from '../common/query-error';
import CharacterCard from './character-card';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import CharacterSkillCard from './character-skill-card';
import CharacterEditSkillForm from './character-edit-skill-form';

const CharacterDetail = ({ classId }: { classId: string }) => {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { isLoading, data, error } = useCharacterSkillList(classId);
  const createSkillMutation = useAdminCreateSkill(classId);
  const updateMutation = useAdminUpdateCharacter();
  const deleteMutation = useAdminDeleteCharacter();

  if (isLoading)
    return (
      <div className='space-y-2'>
        <Card className='w-full max-w-sm mx-auto'>
          <CardContent>
            <Skeleton className='h-72 w-full' />
          </CardContent>
        </Card>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-2 w-full'>
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className='w-full max-w-sm'>
              <CardContent>
                <Skeleton className='h-96 w-full' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );

  if (error) return <QueryError error={error} />;

  if (!data) {
    return (
      <Card className='w-full'>
        <CardContent className='flex items-center justify-center gap-2 h-72'>
          <p>캐릭터를 찾지 못했습니다</p>
        </CardContent>
      </Card>
    );
  }

  const onCreate = async (
    skill: CharacterSkillFormValues,
    optional?: () => void,
  ) => {
    const { name: skillName } = skill;
    const formData = createCharacterSkillFormData(skill, [classId]);
    const promise = createSkillMutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: `${skillName} 등록 중...`,
      success: () => {
        optional?.();
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

  const onEdit = (classData: CharacterFormValues) => {
    const formData = createCharacterFormData(classData);

    const promise = updateMutation.mutateAsync({ formData, classId });

    toast.promise(promise, {
      loading: `${classData.name} 수정 중...`,
      success: () => {
        setEditOpen(false);
        return `${classData.name}가 수정되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '수정에 실패했습니다.',
    });
  };

  const onDelete = () => {
    const className = data.name;
    const promise = deleteMutation.mutateAsync({ classId, className });

    toast.promise(promise, {
      loading: `${className} 삭제 중...`,
      success: () => {
        setDeleteOpen(false);
        router.push('/dashboard/character');
        return `${className}가 삭제되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '삭제에 실패했습니다.',
    });
  };

  return (
    <div className='gap-2 flex-col mx-auto flex items-center'>
      <div className='mx-auto'>
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger render={<Button variant='secondary'>수정</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <CharacterEditForm
              defaultValues={data}
              mode='update'
              mutate={onEdit}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger render={<Button variant='destructive'>삭제</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{data.name}</DialogTitle>
              <DialogDescription className='text-red-300'>
                해당 직업을 삭제 하겠습니까?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant='outline'>취소</Button>} />
              <Button variant='destructive' onClick={onDelete}>
                네
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <CharacterCard character={data} />
      <div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2 w-full'>
        {data?.skills.map((skill) => (
          <CharacterSkillCard key={skill.name} classId={classId} {...skill} />
        ))}
        <CharacterEditSkillForm
          onSubmit={onCreate}
          mode='create'
          onCancel={() => {}}
          disabled={createSkillMutation.isPending}
        />
      </div>
    </div>
  );
};

export default CharacterDetail;
