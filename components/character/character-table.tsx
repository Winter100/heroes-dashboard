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
import EditForm from '@/components/character/edit-form';
import { Button } from '@/components/ui/button';
import { useCharacter } from '@/hooks/use-character';
import { SquarePen } from 'lucide-react';
import { formatDate, getDaysSince } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 캐릭터 생성은 여기서 Dialog로
// 수정 삭제는 디테일 페이지에서 처리하기
const CharacterTable = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const { data, onCreate } = useCharacter();
  const router = useRouter();

  return (
    <div className='max-w-2xl mx-auto p-2 bg-muted/50 rounded-md'>
      {/* 직업 생성 버튼 & 모달 */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogTrigger render={<Button variant='secondary'>New</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <EditForm
            mode='create'
            mutate={onCreate}
            onSuccess={() => setCreateOpen(false)}
          />
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
              <TableHead className='text-center'>수정</TableHead>
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
