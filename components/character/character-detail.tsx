'use client';

import { createCharacterFormData, formatDate, getDaysSince } from '@/lib/utils';
import { useCharacterSkillList } from '@/hooks/character/use-character-skill-list';
import CharacterSkillContainer from './character-skill-container';
import { Button } from '../ui/button';
import { useAdminCharacter } from '@/hooks/character/use-admin-character';
import { CharacterFormValues } from '@/schema/character.schema';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CharacterDetail = ({ classId }: { classId: string }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const router = useRouter();
  const { isLoading, data, error } = useCharacterSkillList(classId);
  const { updateMutation, deleteMutation } = useAdminCharacter(classId);

  if (isLoading) return <div>로딩 테스트</div>;
  if (error) return <div>에러</div>;

  if (!data) {
    return <div>캐릭터 정보가 없습니다.</div>;
  }

  const onEdit = (classData: CharacterFormValues) => {
    const formData = createCharacterFormData(classData, classId);

    const promise = updateMutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: `${classData.name} 수정 중...`,
      success: () => {
        setEditOpen(false);
        return `${classData.name}가 수정되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '등록에 실패했습니다.',
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
    <div className='border gap-4 p-6 flex-col border-red-300 mx-auto flex items-center'>
      <Card className='max-w-sm w-full'>
        <div className='flex items-center gap-2'>
          <CardHeader className='flex-1'>
            <CardTitle>
              <AspectRatio ratio={1 / 1} className='w-full rounded-lg bg-muted'>
                <Image src='' alt='Image' className='rounded-md object-cover' />
              </AspectRatio>
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className='flex-1  flex flex-col gap-1'>
            <div className='space-x-1'>
              <span>직업</span>
              <span>{data?.name}</span>
            </div>
            <div className='space-x-1'>
              <span>성별</span>
              <span>{data?.gender === 'male' ? '남성' : '여성'}</span>
            </div>
            <div className='space-x-1'>
              <span>스킬수</span>
              <span>{data?.skills.length}</span>
            </div>
            <div className='space-x-1'>
              <span>출시일</span>
              <span>{formatDate(data?.releaseDate ?? '')}</span>
            </div>
            <div className='space-x-1'>
              <span>출시후</span>
              <span>
                {getDaysSince(data?.releaseDate ?? '').toLocaleString()} 일
              </span>
            </div>
          </CardContent>
        </div>
        <CardFooter>
          <div className='mx-auto'>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger
                render={<Button variant='secondary'>수정</Button>}
              />
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
              <DialogTrigger
                render={<Button variant='destructive'>삭제</Button>}
              />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{data.name}</DialogTitle>
                  <DialogDescription className='text-red-300'>
                    해당 직업을 삭제 하겠습니까?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose
                    render={<Button variant='outline'>취소</Button>}
                  />
                  <Button variant='destructive' onClick={onDelete}>
                    네
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
      <CharacterSkillContainer classId={classId} data={data} />
    </div>
  );
};

export default CharacterDetail;
