'use client';
import { ChartBar } from '../chart-bar';
import { ChartPieLabel } from '../chart-pie-label';
import { useCharacterStatistics } from '@/hooks/character/use-character';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import QueryError from '../common/query-error';

const CharacterStatistics = () => {
  const { isLoading, error, data } = useCharacterStatistics();
  if (isLoading)
    return (
      <Card className='w-full'>
        <CardContent className='flex items-center gap-2 h-72'>
          <Skeleton className='w-full max-w-sm h-full' />
          <Skeleton className='w-full h-full' />
        </CardContent>
      </Card>
    );

  if (error) return <QueryError error={error} />;

  return (
    <div className='flex items-center gap-2 w-full'>
      <ChartPieLabel genderCount={data?.genderCount ?? []} />
      <ChartBar year={data?.year ?? []} />
    </div>
  );
};

export default CharacterStatistics;
