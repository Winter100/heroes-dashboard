import CharacterCreateDialog from '@/components/character/dialogs/character-create-dialog';
import CharacterRevalidateDialog from '@/components/character/dialogs/character-revalidate-dialog';
import CharacterStatistics from '@/components/character/character-statistics';
import CharacterList from '@/components/character/list/character-list';
import QueryErrorBoundary from '@/components/common/query-error-boundary';
import StatisticsLoading from '@/components/common/statistics-loading';
import LoadingSkeleton from '@/components/loading-skeleton';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <CharacterCreateDialog />
        <CharacterRevalidateDialog />
      </div>
      <div className='flex items-center gap-2'>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <CharacterStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <QueryErrorBoundary fallback={<LoadingSkeleton />}>
          <CharacterList />
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
