'use client';
import DetailLoading from '@/components/common/detail-loading';
import QueryErrorBoundary from '@/components/common/query-error-boundary';
import ItemRecipeList from '@/components/item/list/item-recipe-list';
import { useParams } from 'next/navigation';

const Page = () => {
  const { stepId } = useParams<{ stepId: string }>();
  return (
    <QueryErrorBoundary fallback={<DetailLoading />}>
      <ItemRecipeList key={stepId} stepId={stepId} />
    </QueryErrorBoundary>
  );
};

export default Page;
