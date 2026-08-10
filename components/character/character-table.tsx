'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CharacterEditForm from '@/components/character/character-edit-form';
import { Button } from '@/components/ui/button';
import { useCharacter } from '@/hooks/character/use-character';
import { SquarePen } from 'lucide-react';
import { createCharacterFormData, formatDate, getDaysSince } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CharacterFormValues } from '@/schema/character.schema';
import { toast } from '../ui/toast';
import { useAdminCreateCharacter } from '@/hooks/character/use-admin-create-character';

const CharacterTable = () => {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const { data, isLoading, error } = useCharacter();
  const createMutation = useAdminCreateCharacter();

  if (isLoading) return <div>로딩</div>;
  if (error) return <div>에러</div>;
  const onCreate = (classData: CharacterFormValues) => {
    const { name: className } = classData;
    const formData = createCharacterFormData(classData);

    const promise = createMutation.mutateAsync(formData);

    toast.promise(promise, {
      loading: `${className} 생성중...`,
      success: () => {
        setCreateOpen(false);
        return `${className}가 생성되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '등록에 실패했습니다.',
    });
  };

  return (
    <div className='max-w-2xl mx-auto p-2 bg-muted/50 rounded-md'>
      {/* 직업 생성 버튼 & 모달 */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogTrigger
          render={<Button variant='secondary'>직업 생성</Button>}
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CharacterEditForm mode='create' mutate={onCreate} />
        </DialogContent>
      </Dialog>

      <div>
        <Table className='w-full'>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>번호</TableHead>
              <TableHead>직업명</TableHead>
              <TableHead>성별</TableHead>
              <TableHead>출시일</TableHead>
              <TableHead>출시일로부터</TableHead>
              <TableHead className='text-center'>상세</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((character, i) => (
              <TableRow key={character.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{character.name}</TableCell>
                <TableCell>
                  {character.gender === 'male' ? '남성' : '여성'}
                </TableCell>
                <TableCell>{formatDate(character.releaseDate)}</TableCell>
                <TableCell>
                  {getDaysSince(character.releaseDate).toLocaleString()} 일
                </TableCell>
                <TableCell
                  className='underline hover:text-blue-300 hover:cursor-pointer mx-auto  flex items-center justify-center'
                  onClick={() => router.push(`character/${character.id}`)}
                >
                  <SquarePen size={18} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CharacterTable;
