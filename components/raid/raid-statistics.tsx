'use client';
import { ChartBar } from '../chart-bar';
import { ChartPieLabel } from '../chart-pie-label';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import QueryError from '../common/query-error-boundary';
import { useRaidStatistics } from '@/hooks/raid/use-raid';
import { ChartConfig } from '../ui/chart';

const chartConfig = {
  count: {
    label: '레이드',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const RaidStatistics = () => {
  const { isLoading, error, data } = useRaidStatistics();
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
    <div className='flex items-center gap-2 w-full flex-col'>
      <div className='flex gap-2 text-sm mr-auto text-blue-300'>
        <span>등록된 레이드: {data?.count}</span>
      </div>
      <ChartBar
        title='레이드 수'
        dataKey='name'
        data={data?.raids ?? []}
        config={chartConfig}
      />
    </div>
  );
};

export default RaidStatistics;
