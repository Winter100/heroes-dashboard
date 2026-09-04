import ItemCreate from '@/components/item/item-create';
import ItemStatistics from '@/components/item/item-statistics';
import ItemTable from '@/components/item/item-table';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <ItemCreate />
      </div>
      <div className='flex items-center gap-2'>
        <ItemStatistics />
      </div>
      <div>
        <ItemTable />
      </div>
    </div>
  );
};

export default Page;
