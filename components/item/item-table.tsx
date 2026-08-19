'use client';

import { useItem } from '@/hooks/item/use-item';
import QueryError from '../common/query-error';
import ItemCard from './item-card';
import LoadingSkeleton from '../loading-skeleton';

const ItemTable = () => {
  const { isLoading, data, error } = useItem();

  if (isLoading) return <LoadingSkeleton />;

  if (error) return <QueryError error={error} />;

  return (
    <div>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
        {data?.map((item) => (
          <ItemCard key={item.id} item={item} isDetailLink />
        ))}
      </div>
    </div>
  );
};

export default ItemTable;
