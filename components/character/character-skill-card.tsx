import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';
import ChracterEditSkill from './character-edit-skill-form';
import { CharacterSkillFormValues } from '@/schema/character.schema';
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
import { useAdminCharacterSkill } from '@/hooks/character/use-admin-character-skill';
import { createCharacterSkillFormData } from '@/lib/utils';
import { toast } from '../ui/toast';

type Props = {
  name: string;
  description: string;
  id: string;
  classId: string;
};
const CharacterSkillCard = ({ id, name, description, classId }: Props) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { updateSkillMutation, deleteSkillMutation } =
    useAdminCharacterSkill(classId);
  const skillId = id;

  const onEdit = async (
    skill: CharacterSkillFormValues,
    optional?: () => void,
  ) => {
    const formData = createCharacterSkillFormData(skill, classId, skillId);
    const promise = updateSkillMutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: `${name} 수정 중...`,
      success: () => {
        optional?.();
        return {
          type: 'success',
          title: name,
          description: '스킬이 수정되었습니다.',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: name,
          description:
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
  };

  const onDelete = async () => {
    console.log(skillId, classId);
    const promise = deleteSkillMutation.mutateAsync({ classId, skillId });

    toast.promise(promise, {
      loading: `${name} 삭제 중...`,
      success: () => {
        setDeleteOpen(false);
        return {
          type: 'success',
          title: name,
          description: '스킬이 삭제되었습니다.',
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: name,
          description:
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
  };

  if (updateOpen) {
    return (
      <ChracterEditSkill
        defaultValues={{ name, description }}
        onSubmit={onEdit}
        onCancel={() => setUpdateOpen(false)}
        mode='update'
        disabled={updateSkillMutation.isPending}
      />
    );
  }

  return (
    <Card key={name} className='max-w-sm w-full h-full min-h-72'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <div className='w-7 h-7 border border-red-300'></div>
          <div>{name}</div>
        </CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <Button variant='secondary' onClick={() => setUpdateOpen(true)}>
            수정
          </Button>

          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger
              render={
                <Button
                  disabled={deleteSkillMutation.isPending}
                  variant='secondary'
                  onClick={() => setDeleteOpen(true)}
                >
                  삭제
                </Button>
              }
            />
            <DialogContent className='sm:max-w-sm'>
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription className='text-red-300'>
                  해당 스킬을 삭제 하겠습니까?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose
                  disabled={deleteSkillMutation.isPending}
                  render={<Button variant='outline'>취소</Button>}
                />
                <Button
                  disabled={deleteSkillMutation.isPending}
                  variant='destructive'
                  onClick={onDelete}
                >
                  삭제
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent className='whitespace-pre-line'>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default CharacterSkillCard;
