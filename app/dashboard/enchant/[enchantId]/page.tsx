'use client';

import DetailLoading from '@/components/common/detail-loading';
import QueryErrorBoundary from '@/components/common/query-error-boundary';
import EnchantDetail from '@/components/enchant/detail/enchant-detail';
import { useParams } from 'next/navigation';

const Page = () => {
  const { enchantId } = useParams<{ enchantId: string }>();
  return (
    <QueryErrorBoundary fallback={<DetailLoading />}>
      <EnchantDetail enchantId={enchantId} />
    </QueryErrorBoundary>
  );
};

export default Page;
