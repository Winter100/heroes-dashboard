import EnchantCreate from '@/components/enchant/enchant-create';
import EnchantTable from '@/components/enchant/enchant-table';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <EnchantCreate />
      </div>
      <div className='flex items-center gap-2'>
        {/* <CharacterStatistics /> */}
      </div>
      <div>
        <EnchantTable />
      </div>
    </div>
  );
};

export default Page;
