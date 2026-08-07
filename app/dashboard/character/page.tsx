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

/**
 * Todo
 * - 캐릭터 직업 관련 대시 보드
 * 1. 직업 등록
 * 2. 직업 수정
 * 3. 남/녀 차트
 * 4. 출시일 연도 기준 차트
 */
export type Character = {
  id: number;
  name: string;
  image: string;
  gender: 'male' | 'female';
  releaseDate: string;
  battleType?: string;
};
const Page = () => {
  const { isLoading, data, onCreate, onEdit } = useCharacter();

  if (isLoading) return <div>로딩</div>;

  return (
    <div className='max-w-6xl mx-auto w-full'>
      <Dialog>
        <DialogTrigger render={<Button variant='outline'>New</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <EditForm mode='create' onSubmit={onCreate} />
        </DialogContent>
      </Dialog>
      <div className='p-2 bg-card rounded-md'>
        <Table className='max-w-xl mx-auto w-full'>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>번호</TableHead>
              <TableHead>직업명</TableHead>
              <TableHead>성별</TableHead>
              <TableHead>출시일</TableHead>
              <TableHead>출시일로부터</TableHead>
              <TableHead>수정</TableHead>
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
                <TableCell>
                  <Dialog>
                    <DialogTrigger>수정</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <EditForm
                        character={character}
                        mode='update'
                        onSubmit={onEdit}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;

export function getDaysSince(date: Date | string): number {
  const target = typeof date === 'string' ? new Date(date) : date;

  return Math.floor((Date.now() - target.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDate(date: Date | string): string {
  const target = typeof date === 'string' ? new Date(date) : date;

  return target.toISOString().slice(0, 10);
}
