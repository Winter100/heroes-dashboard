'use client';

import { characterApi } from '@/api/api';
import { CharacterDetailType } from '@/types/character-type';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { formatDate, getDaysSince } from '@/lib/utils';

const CharacterDetail = ({ id }: { id: string }) => {
  const { isLoading, data } = useQuery<CharacterDetailType>({
    queryKey: [id, 'class'],
    queryFn: () => characterApi.findOne(id),
  });
  if (isLoading) return <div>로딩 테스트</div>;

  console.log('data', data);
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
          <Card key={skill.name} className='max-w-sm w-full h-full'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <div className='w-7 h-7 border border-red-300'></div>
                <div>{skill.name}</div>
              </CardTitle>
              <CardDescription></CardDescription>
              <CardAction>
                <Button>수정</Button>
                <Button>삭제</Button>
              </CardAction>
            </CardHeader>
            <CardContent className='whitespace-pre-line'>
              <p>{skill.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CharacterDetail;
