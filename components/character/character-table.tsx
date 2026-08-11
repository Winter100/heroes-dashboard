'use client';

import { Button } from '@/components/ui/button';
import { useCharacter } from '@/hooks/character/use-character';
import { formatDate, getDaysSince } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const CharacterTable = () => {
  const router = useRouter();
  const { data, isLoading, error } = useCharacter();

  if (isLoading) return <div>로딩</div>;
  if (error) return <div>에러</div>;

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
      {data?.map((character) => (
        <Card
          key={character.id}
          className='relative mx-auto w-full max-w-sm pt-0'
        >
          <div className='absolute inset-0 z-30 aspect-video bg-black/35' />
          <img
            src='https://avatar.vercel.sh/shadcn1'
            alt='Event cover'
            className='relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40'
          />
          <CardHeader>
            <CardAction></CardAction>
            <CardTitle className='mb-1'>{character.name}</CardTitle>
            <CardDescription>
              <div className='flex flex-col gap-0.5'>
                <div className='flex items-center gap-2'>
                  <div className='w-24'>성별</div>
                  <div>{character.gender === 'male' ? '남성' : '여성'}</div>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-24'>스킬수</div>
                  <div>{character.skillCount}</div>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-24'>출시일</div>
                  <div>{formatDate(character.releaseDate)}</div>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-24'>출시후</div>
                  <div>
                    {getDaysSince(character.releaseDate).toLocaleString()} 일
                  </div>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className='w-full'
              onClick={() => router.push(`character/${character.id}`)}
            >
              자세히
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CharacterTable;
