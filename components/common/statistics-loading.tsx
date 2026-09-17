'use client';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const StatisticsLoading = () => {
  return (
    <Card className='w-full'>
      <CardContent className='flex items-center gap-2 h-72'>
        <Skeleton className='w-full max-w-sm h-full' />
        <Skeleton className='w-full h-full' />
      </CardContent>
    </Card>
  );
};

export default StatisticsLoading;
