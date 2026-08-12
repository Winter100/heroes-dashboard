'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
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
import { YearStatistics } from '@/types/character-type';

const chartConfig = {
  count: {
    label: '출시',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function ChartBar({ year }: { year: YearStatistics[] }) {
  return (
    <Card className='w-full'>
      <CardHeader className='pb-0 flex-1'>
        <CardTitle>연도별 캐릭터 출시</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='mx-auto max-h-64 w-full aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground'
        >
          <BarChart accessibilityLayer data={year}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='year'
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='count' fill='var(--color-count)' radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
