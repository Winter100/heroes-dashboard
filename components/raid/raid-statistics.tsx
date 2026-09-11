'use client';
import { ChartBar } from '../chart-bar';
import { useRaidStatistics } from '@/hooks/raid/use-raid';
import { ChartConfig } from '../ui/chart';

const chartConfig = {
  count: {
    label: '레이드',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const RaidStatistics = () => {
  const { data } = useRaidStatistics();
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
