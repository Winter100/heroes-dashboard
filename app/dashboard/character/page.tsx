'use client';

import CharacterCreate from '@/components/character/character-create';
import CharacterStatistics from '@/components/character/character-statistics';
import CharacterTable from '@/components/character/character-table';

/**
 * Todo
 * - 캐릭터 직업 관련 대시 보드
 * 1. 직업 등록 v
 * 2. 직업 수정 v
 * 3. 남/녀 차트 v
 * 4. 출시일 연도 기준 차트 v
 */

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
