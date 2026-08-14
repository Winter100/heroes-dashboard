'use client';

import { useItem } from '@/hooks/item/use-item';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import QueryError from '../common/query-error';
import ItemCard from './item-card';

const ItemTable = () => {
  const { isLoading, data, error } = useItem();

  if (isLoading)
    return (
      <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={i} className='w-full max-w-sm'>
            <CardContent>
              <Skeleton className='h-72 w-full' />
            </CardContent>
          </Card>
        ))}
      </div>
    );

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
