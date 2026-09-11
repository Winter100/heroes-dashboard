import CharacterStatistics from '@/components/character/character-statistics';
import QueryErrorBoundary from '@/components/common/query-error-boundary';
import StatisticsLoading from '@/components/common/statistics-loading';
import EnchantStatistics from '@/components/enchant/enchant-statistics';
import ItemStatistics from '@/components/item/item-statistics';
import RaidStatistics from '@/components/raid/raid-statistics';

export default function Page() {
  return (
    <div className='max-w-6xl mx-auto w-full space-y-10'>
      <div>
        <h2 className='my-2'>직업</h2>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <CharacterStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <h2 className='my-2'>레이드</h2>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <RaidStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <h2 className='my-2'>인챈트</h2>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <EnchantStatistics />
        </QueryErrorBoundary>
      </div>
      <div>
        <h2 className='my-2'>아이템</h2>
        <QueryErrorBoundary fallback={<StatisticsLoading />}>
          <ItemStatistics />
        </QueryErrorBoundary>
      </div>
    </div>
  );
}
