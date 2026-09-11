'use client';
import { ChartBar } from '../chart-bar';
import { ChartConfig } from '../ui/chart';
import { useEnchantStatistics } from '@/hooks/enchant/use-enchant';

const chartConfig = {
  count: {
    label: '랭크',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const EnchantStatistics = () => {
  const { data } = useEnchantStatistics();

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
