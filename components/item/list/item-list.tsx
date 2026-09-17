'use client';

import { useItem } from '@/hooks/item/use-item';
import ItemCard from '../card/item-card';

const ItemList = () => {
  const { data } = useItem();

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

export default ItemList;
