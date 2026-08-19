'use client';
import QueryError from '../common/query-error';
import EnchantCard from './enchant-card';
import LoadingSkeleton from '../loading-skeleton';
import { useEnchant } from '@/hooks/enchant/use-enchant';

const EnchantTable = () => {
  const { isLoading, error, data } = useEnchant();

  if (isLoading) return <LoadingSkeleton />;

  if (error) return <QueryError error={error} />;

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
      {data?.map((enchant) => (
        <EnchantCard key={enchant.id} enchant={enchant} isDetailLink />
      ))}
    </div>
  );
};

export default EnchantTable;
