import CharacterStatistics from '@/components/character/character-statistics';
import EnchantStatistics from '@/components/enchant/enchant-statistics';
import ItemStatistics from '@/components/item/item-statistics';
import RaidStatistics from '@/components/raid/raid-statistics';

export default function Page() {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-10'>
      <div>
        <h2 className='my-2'>직업</h2>
        <CharacterStatistics />
      </div>
      <div>
        <h2 className='my-2'>레이드</h2>
        <RaidStatistics />
      </div>
      <div>
        <h2 className='my-2'>인챈트</h2>
        <EnchantStatistics />
      </div>
      <div>
        <h2 className='my-2'>아이템</h2>
        <ItemStatistics />
      </div>
    </div>
  );
}
