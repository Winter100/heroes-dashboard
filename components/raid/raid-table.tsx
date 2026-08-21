'use client';
import { useRaid } from '@/hooks/raid/use-raid';
import LoadingSkeleton from '../loading-skeleton';
import QueryError from '../common/query-error';
import RaidCard from './raid-card';

const RaidTable = () => {
  const { isLoading, error, data } = useRaid();

  if (isLoading) return <LoadingSkeleton />;

  if (error) return <QueryError error={error} />;

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
      {data?.map((raid) => (
        <RaidCard key={raid.id} raid={raid} isDetailLink />
      ))}
    </div>
  );
};

export default RaidTable;
