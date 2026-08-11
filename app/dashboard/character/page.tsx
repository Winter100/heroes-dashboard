'use client';

import CharacterCreate from '@/components/character/character-create';
import CharacterTable from '@/components/character/character-table';

/**
 * Todo
 * - 캐릭터 직업 관련 대시 보드
 * 1. 직업 등록
 * 2. 직업 수정
 * 3. 남/녀 차트
 * 4. 출시일 연도 기준 차트
 * 5. 각 캐릭당 스킬 갯수 차트
 */

const Page = () => {
  return (
    <div className='max-w-6xl mx-auto w-full'>
      <div>각종 차트 자리</div>
      <div className='flex items-center justify-end mb-2'>
        <CharacterCreate />
      </div>
      <CharacterTable />
    </div>
  );
};

export default Page;
