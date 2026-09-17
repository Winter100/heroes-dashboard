'use client';
import DetailLoading from '@/components/common/detail-loading';
import QueryErrorBoundary from '@/components/common/query-error-boundary';
import RaidDetail from '@/components/raid/detail/raid-detail';
import { useParams } from 'next/navigation';

const Page = () => {
  const { raidId } = useParams<{ raidId: string }>();

  return (
    <div className='max-w-6xl mx-auto w-full'>
      <QueryErrorBoundary fallback={<DetailLoading />}>
        <RaidDetail raidId={raidId} />
      </QueryErrorBoundary>
    </div>
  );
};

export default Page;
