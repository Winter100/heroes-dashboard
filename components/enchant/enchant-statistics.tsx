'use client';
import { ChartBar } from '../chart-bar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import QueryError from '../common/query-error';
import { ChartConfig } from '../ui/chart';
import { useEnchantStatistics } from '@/hooks/enchant/use-enchant';

const chartConfig = {
  count: {
    label: '랭크',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const EnchantStatistics = () => {
  const { isLoading, error, data } = useEnchantStatistics();
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
          title='랭크별 인챈트'
          dataKey='rank'
          data={data?.ranks ?? []}
          config={chartConfig}
        />
        <ChartBar
          title='접사별 인챈트'
          dataKey='name'
          data={data?.affixs ?? []}
          config={chartConfig}
        />
      </div>
      <div className='w-full'>
        <ChartBar
          title='티어별 인챈트'
          dataKey='rank'
          data={data?.tiers ?? []}
          config={chartConfig}
        />
      </div>
    </div>
  );
};

export default EnchantStatistics;
