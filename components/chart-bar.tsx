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
} from '@/components/ui/chart';

type ChartBarType = {
  title: string;
  dataKey: string;
  config: { count: { label: string; color: string } };
  data: Record<string, string | number>[];
};

export function ChartBar({ title, config, dataKey, data }: ChartBarType) {
  return (
    <Card className='w-full'>
      <CardHeader className='pb-0 flex-1'>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className='mx-auto max-h-64 w-full aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground'
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKey}
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
