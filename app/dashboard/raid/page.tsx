import RaidCreate from '@/components/raid/raid-create';
import RaidTable from '@/components/raid/raid-table';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <RaidCreate />
      </div>
      <div className='flex items-center gap-2'>
        {/* <CharacterStatistics /> */}
      </div>
      <div>
        <RaidTable />
      </div>
    </div>
  );
};

export default Page;
