import CharacterStatistics from '@/components/character/character-statistics';
import QueryErrorBoundary from '@/components/common/query-error-boundary';
import StatisticsLoading from '@/components/common/statistics-loading';
import EnchantStatistics from '@/components/enchant/enchant-statistics';
import ItemStatistics from '@/components/item/item-statistics';
import RaidStatistics from '@/components/raid/raid-statistics';
import type { ReactNode } from 'react';

type StatisticsSection = {
  title: string;
  content: ReactNode;
};

const statisticsSections = [
  { title: '직업', content: <CharacterStatistics /> },
  { title: '레이드', content: <RaidStatistics /> },
  { title: '인챈트', content: <EnchantStatistics /> },
  { title: '아이템', content: <ItemStatistics /> },
] satisfies StatisticsSection[];

export default function Page() {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-10'>
      {statisticsSections.map(({ title, content }) => (
        <section key={title}>
          <h2 className='my-2'>{title}</h2>
          <QueryErrorBoundary fallback={<StatisticsLoading />}>
            {content}
          </QueryErrorBoundary>
        </section>
      ))}
    </div>
  );
}
