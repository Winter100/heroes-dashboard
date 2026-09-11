'use client';
import { ChartBar } from '../chart-bar';
import { ChartPieLabel } from '../chart-pie-label';
import { useCharacterStatistics } from '@/hooks/character/use-character';
import { ChartConfig } from '../ui/chart';

const chartConfig = {
  count: {
    label: '출시',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const CharacterStatistics = () => {
  const { data } = useCharacterStatistics();

  return (
    <div className='items-center gap-2 w-full flex flex-col'>
      <div className='flex gap-2 text-sm mr-auto text-blue-300'>
        <span>등록된 캐릭터: {data?.total}</span>
      </div>
      <div className='w-full flex flex-row gap-2 items-center'>
        <ChartPieLabel genderCount={data?.genderCount ?? []} />
        <ChartBar
          title='연도별 캐릭터 출시'
          dataKey='year'
          data={data?.year ?? []}
          config={chartConfig}
        />
      </div>
    </div>
  );
};

export default CharacterStatistics;
