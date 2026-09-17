import type { ReactNode } from 'react';
import LoadingSkeleton from '@/components/loading-skeleton';
import QueryErrorBoundary from './query-error-boundary';
import StatisticsLoading from './statistics-loading';

type DashboardResourcePageProps = {
  actions: ReactNode;
  statistics: ReactNode;
  list: ReactNode;
};

const DashboardResourcePage = ({
  actions,
  statistics,
  list,
}: DashboardResourcePageProps) => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>{actions}</div>
      <div className='flex items-center gap-2'>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          {statistics}
        </QueryErrorBoundary>
      </div>
      <div>
        <QueryErrorBoundary fallback={<LoadingSkeleton />}>
          {list}
        </QueryErrorBoundary>
      </div>
    </div>
  );
};

export default DashboardResourcePage;
