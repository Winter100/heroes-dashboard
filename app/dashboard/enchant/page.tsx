import QueryErrorBoundary from '@/components/common/query-error-boundary';
import StatisticsLoading from '@/components/common/statistics-loading';
import EnchantCreateDialog from '@/components/enchant/dialogs/enchant-create-dialog';
import EnchantRevalidateDialog from '@/components/enchant/dialogs/enchant-revalidate-dialog';
import EnchantStatistics from '@/components/enchant/enchant-statistics';
import EnchantList from '@/components/enchant/list/enchant-list';
import LoadingSkeleton from '@/components/loading-skeleton';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <EnchantCreateDialog />
        <EnchantRevalidateDialog />
      </div>
      <div className='flex items-center gap-2'>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <EnchantStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <QueryErrorBoundary fallback={<LoadingSkeleton />}>
          <EnchantList />
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
