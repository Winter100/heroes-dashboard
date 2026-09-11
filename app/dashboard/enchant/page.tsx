import QueryErrorBoundary from '@/components/common/query-error-boundary';
import StatisticsLoading from '@/components/common/statistics-loading';
import EnchantCreate from '@/components/enchant/enchant-create';
import EnchantStatistics from '@/components/enchant/enchant-statistics';
import EnchantTable from '@/components/enchant/enchant-table';
import LoadingSkeleton from '@/components/loading-skeleton';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <EnchantCreate />
      </div>
      <div className='flex items-center gap-2'>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <EnchantStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <QueryErrorBoundary fallback={<LoadingSkeleton />}>
          <EnchantTable />
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
