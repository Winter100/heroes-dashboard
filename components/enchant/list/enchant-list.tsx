'use client';
import EnchantCard from '../card/enchant-card';
import { useEnchant } from '@/hooks/enchant/use-enchant';

const EnchantList = () => {
  const { data } = useEnchant();

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
      {data?.map((enchant) => (
        <EnchantCard key={enchant.id} enchant={enchant} isDetailLink />
      ))}
    </div>
  );
};

export default EnchantList;
