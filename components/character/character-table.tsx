'use client';

import { useCharacter } from '@/hooks/character/use-character';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import QueryError from '../common/query-error';
import CharacterCard from './character-card';

const CharacterTable = () => {
  const { data, isLoading, error } = useCharacter();

  if (isLoading)
    return (
      <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={i} className='w-full max-w-sm'>
            <CardContent>
              <Skeleton className='h-72 w-full' />
            </CardContent>
          </Card>
        ))}
      </div>
    );

  if (error) return <QueryError error={error} />;

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
      {data?.map((character) => (
        <CharacterCard key={character.id} character={character} isDetailLink />
      ))}
    </div>
  );
};

export default CharacterTable;
