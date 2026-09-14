'use client';
import CharacterDetail from '@/components/character/detail/character-detail';
import DetailLoading from '@/components/common/detail-loading';
import QueryErrorBoundary from '@/components/common/query-error-boundary';
import { useParams } from 'next/navigation';

const Page = () => {
  const { classId } = useParams<{ classId: string }>();

  return (
    <div className='max-w-6xl mx-auto w-full'>
      <QueryErrorBoundary fallback={<DetailLoading />}>
        <CharacterDetail classId={classId} />
      </QueryErrorBoundary>
    </div>
  );
};

export default Page;
