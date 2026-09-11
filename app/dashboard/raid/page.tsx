import QueryErrorBoundary from '@/components/common/query-error-boundary';
import StatisticsLoading from '@/components/common/statistics-loading';
import LoadingSkeleton from '@/components/loading-skeleton';
import RaidCreate from '@/components/raid/raid-create';
import RaidStatistics from '@/components/raid/raid-statistics';
import RaidTable from '@/components/raid/raid-table';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <RaidCreate />
      </div>
      <div className='flex items-center gap-2'>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <RaidStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <QueryErrorBoundary fallback={<LoadingSkeleton />}>
          <RaidTable />
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
