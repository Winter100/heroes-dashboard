'use client';
import { ChartBar } from '../chart-bar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import QueryError from '../common/query-error-boundary';
import { ChartConfig } from '../ui/chart';
import { useItemStatistics } from '@/hooks/item/use-item';

const ItemStatistics = () => {
  const { isLoading, error, data } = useItemStatistics();
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
        <span>등록된 아이템: {data?.total}</span>
      </div>
      <div className='flex items-center w-full gap-2'>
        <ChartBar
          title='카테고리별 아이템'
          dataKey='name'
          data={data?.categories ?? []}
          config={categoryConfig}
        />
        <ChartBar
          title='티어별 아이템'
          dataKey='name'
          data={data?.tiers ?? []}
          config={tierConfig}
        />
      </div>
    </div>
  );
};

export default ItemStatistics;

const categoryConfig = {
  count: {
    label: '카테고리',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const tierConfig = {
  count: {
    label: '티어',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;
