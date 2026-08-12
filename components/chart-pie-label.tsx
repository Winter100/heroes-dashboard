'use client';

import { LabelList, Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { GenderCount } from '@/types/character-type';

const chartConfig = {
  count: {
    label: '인원 수',
  },
  male: {
    label: '남성',
    color: 'var(--chart-1)',
  },
  female: {
    label: '여성',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function ChartPieLabel({ genderCount }: { genderCount: GenderCount[] }) {
  return (
    <Card className='flex flex-col w-full max-w-sm'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>직업 성별</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className='pb-0 flex-1'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto max-h-64 w-full aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground'
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

            <Pie data={genderCount} nameKey='gender' dataKey='count' label>
              <LabelList
                dataKey='gender'
                className='fill-background'
                stroke='none'
                fontSize={12}
                formatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
