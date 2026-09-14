import QueryErrorBoundary from '@/components/common/query-error-boundary';
import StatisticsLoading from '@/components/common/statistics-loading';
import ItemCreateDialog from '@/components/item/dialogs/item-create-dialog';
import ItemRevalidateDialog from '@/components/item/dialogs/item-revalidate-dialog';
import ItemStatistics from '@/components/item/item-statistics';
import ItemList from '@/components/item/list/item-list';
import LoadingSkeleton from '@/components/loading-skeleton';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <ItemCreateDialog />
        <ItemRevalidateDialog />
      </div>
      <div className='flex items-center gap-2'>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <ItemStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <QueryErrorBoundary fallback={<LoadingSkeleton />}>
          <ItemList />
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
