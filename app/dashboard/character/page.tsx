'use client';

import CharacterCreate from '@/components/character/character-create';
import CharacterStatistics from '@/components/character/character-statistics';
import CharacterTable from '@/components/character/character-table';

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-2'>
      <div className='flex items-center justify-end'>
        <CharacterCreate />
      </div>
      <div className='flex items-center gap-2'>
        <CharacterStatistics />
      </div>
      <div>
        <CharacterTable />
      </div>
    </div>
  );
};

export default Page;
