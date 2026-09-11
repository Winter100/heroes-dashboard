'use client';
import { useRaid } from '@/hooks/raid/use-raid';
import RaidCard from './raid-card';

const RaidTable = () => {
  const { data } = useRaid();

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
      {data?.map((raid) => (
        <RaidCard key={raid.id} raid={raid} isDetailLink />
      ))}
    </div>
  );
};

export default RaidTable;
