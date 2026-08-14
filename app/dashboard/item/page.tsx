import ItemCreate from '@/components/item/item-create';
import ItemTable from '@/components/item/item-table';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <ItemCreate />
      </div>
      <div className='flex items-center gap-2'>
        {/* <CharacterStatistics /> */}
      </div>
      <div>
        {/* <CharacterTable /> */}
        <ItemTable />
      </div>
    </div>
  );
};

export default Page;
