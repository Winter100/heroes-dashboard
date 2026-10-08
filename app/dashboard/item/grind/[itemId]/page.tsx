'use client';

import DetailLoading from '@/components/common/detail-loading';
import QueryErrorBoundary from '@/components/common/query-error-boundary';
import ItemGrind from '@/components/item/grind/item-grind';
import { useParams } from 'next/navigation';

const Page = () => {
  const { itemId } = useParams<{ itemId: string }>();

  return (
    <div className='max-w-6xl mx-auto w-full'>
      <QueryErrorBoundary fallback={<DetailLoading />}>
        <ItemGrind key={itemId} itemId={itemId} />
      </QueryErrorBoundary>
    </div>
  );
};

export default Page;
