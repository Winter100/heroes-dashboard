'use client';

import CharacterCreate from '@/components/character/character-create';
import CharacterRevalidate from '@/components/character/character-revalidate';
import CharacterStatistics from '@/components/character/character-statistics';
import CharacterTable from '@/components/character/character-table';
import QueryErrorBoundary from '@/components/common/query-error-boundary';
import StatisticsLoading from '@/components/common/statistics-loading';
import LoadingSkeleton from '@/components/loading-skeleton';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <CharacterCreate />
        <CharacterRevalidate />
      </div>
      <div className='flex items-center gap-2'>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <CharacterStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <QueryErrorBoundary fallback={<LoadingSkeleton />}>
          <CharacterTable />
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
