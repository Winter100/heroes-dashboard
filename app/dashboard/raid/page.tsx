import QueryErrorBoundary from '@/components/common/query-error-boundary';
import StatisticsLoading from '@/components/common/statistics-loading';
import LoadingSkeleton from '@/components/loading-skeleton';
import RaidCreateDialog from '@/components/raid/dialogs/raid-create-dialog';
import RaidStatistics from '@/components/raid/raid-statistics';
import RaidList from '@/components/raid/list/raid-list';
import RaidRevalidateDialog from '@/components/raid/dialogs/raid-revalidate-dialog';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <RaidCreateDialog />
        <RaidRevalidateDialog />
      </div>
      <div className='flex items-center gap-2'>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <RaidStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <QueryErrorBoundary fallback={<LoadingSkeleton />}>
          <RaidList />
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
