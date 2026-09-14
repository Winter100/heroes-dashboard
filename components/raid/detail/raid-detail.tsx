'use client';

import RaidCard from '../card/raid-card';
import { useRaidDetail } from '@/hooks/raid/use-raid';
import RaidUpdateDialog from '../dialogs/raid-update-dialog';
import RaidDeleteDialog from '../dialogs/raid-delete-dialog';
import QueryErrorBoundary from '../../common/query-error-boundary';
import StatsLoading from '../../common/stats-loading';
import RaidStatsEditContainer from './raid-stats-edit-container';

const RaidDetail = ({ raidId }: { raidId: string }) => {
  const { data } = useRaidDetail(raidId);

  return (
    <div className='gap-2 flex-col mx-auto flex w-full items-center'>
      <div className='mx-auto'>
        {/* 레이드 기본 정보 수정 Dialog */}
        <RaidUpdateDialog raidId={raidId} data={data} />

        {/* 레이드 기본 정보 삭제 Dialog */}
        <RaidDeleteDialog raidId={raidId} battle={data.battle} />
      </div>

      {/* 레이드 기본 정보 Card*/}
      <RaidCard raid={data} />

      {/* 빠른 전투 및 상한 수정 폼 */}
      <div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2 w-full'>
        <div className='w-full max-w-sm'>
          {/* 레이드 빠른 전투 수정 Card*/}
          <QueryErrorBoundary fallback={<StatsLoading />}>
            <RaidStatsEditContainer
              raidId={raidId}
              effects={data.entry.map((s) => ({
                ...s,
                stat_value: s.stat_value.toString(),
              }))}
              mode='ENTRY'
            />
          </QueryErrorBoundary>
        </div>
        <div className='w-full max-w-sm'>
          {/* 레이드 상한 수정 Card*/}
          <QueryErrorBoundary fallback={<StatsLoading />}>
            <RaidStatsEditContainer
              raidId={raidId}
              effects={data.limit.map((s) => ({
                ...s,
                stat_value: s.stat_value.toString(),
              }))}
              mode='LIMIT'
            />
          </QueryErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default RaidDetail;
