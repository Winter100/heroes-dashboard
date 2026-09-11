import QueryErrorBoundary from '@/components/common/query-error-boundary';
import StatisticsLoading from '@/components/common/statistics-loading';
import ItemCreate from '@/components/item/item-create';
import ItemStatistics from '@/components/item/item-statistics';
import ItemTable from '@/components/item/item-table';
import LoadingSkeleton from '@/components/loading-skeleton';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <ItemCreate />
      </div>
      <div className='flex items-center gap-2'>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <ItemStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <QueryErrorBoundary fallback={<LoadingSkeleton />}>
          <ItemTable />
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
