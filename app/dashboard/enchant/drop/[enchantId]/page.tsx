'use client';

import DetailLoading from '@/components/common/detail-loading';
import EnchantDropForm from '@/components/enchant/drop/enchant-drop-form';
import QueryErrorBoundary from '@/components/common/query-error-boundary';
import { useParams } from 'next/navigation';

const Page = () => {
  const { enchantId } = useParams<{ enchantId: string }>();

  return (
    <QueryErrorBoundary fallback={<DetailLoading />}>
      <EnchantDropForm key={enchantId} enchantId={enchantId} />
    </QueryErrorBoundary>
  );
};

export default Page;
