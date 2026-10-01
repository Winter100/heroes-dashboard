'use client';

import RaidCard from '../card/raid-card';
import { useRaidDetail } from '@/hooks/raid/use-raid';
import RaidUpdateDialog from '../dialogs/raid-update-dialog';
import RaidDeleteDialog from '../dialogs/raid-delete-dialog';
import QueryErrorBoundary from '../../common/query-error-boundary';
import StatsLoading from '../../common/stats-loading';
import RaidStatsEditContainer from './raid-stats-edit-container';
import { ADMIN_ROLES, RoleGate } from '@/components/auth/role-gate';
import DetailInfoCard from '@/components/common/detail-info-card';
import DetailRevalidateButton from '@/components/common/detail-revalidate-button';
import { revalidateTags } from '@/constant/constant';

const RaidDetail = ({ raidId }: { raidId: string }) => {
  const { data } = useRaidDetail(raidId);

  return (
    <div className='gap-2 flex-col mx-auto flex w-full items-center'>
      <RoleGate allowedRoles={ADMIN_ROLES}>
        <div className='mx-auto flex items-center gap-2'>
          {/* 레이드 기본 정보 수정 Dialog */}
          <RaidUpdateDialog raidId={raidId} data={data} />

          {/* 레이드 기본 정보 삭제 Dialog */}
          <RaidDeleteDialog raidId={raidId} battle={data.battle} />

          <DetailRevalidateButton
            id={data.battle}
            resourceName='레이드 갱신'
            tag={revalidateTags.raidDetail}
          />
        </div>
      </RoleGate>

      {/* 레이드 기본 정보 Card*/}
      <RaidCard raid={data} />

      {/* 빠른 전투 및 상한 수정 폼 */}
      <div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2 w-full'>
        <div className='w-full max-w-sm'>
          {/* 레이드 빠른 전투 수정 Card*/}
          <RoleGate
            allowedRoles={ADMIN_ROLES}
            fallback={
              <DetailInfoCard
                title='빠른전투'
                sections={[
                  {
                    title: '스탯 효과',
                    items: data.entry.map((stat) => ({
                      id: stat.id,
                      label: stat.stat_name,
                      value: stat.stat_value,
                    })),
                  },
                ]}
              />
            }
          >
            <QueryErrorBoundary fallback={<StatsLoading />}>
              <RaidStatsEditContainer
                raidId={raidId}
                effects={data.entry.map((stat) => ({
                  ...stat,
                  stat_value: stat.stat_value.toString(),
                }))}
                mode='ENTRY'
              />
            </QueryErrorBoundary>
          </RoleGate>
        </div>
        <div className='w-full max-w-sm'>
          {/* 레이드 상한 수정 Card*/}
          <RoleGate
            allowedRoles={ADMIN_ROLES}
            fallback={
              <DetailInfoCard
                title='상한'
                sections={[
                  {
                    title: '스탯 효과',
                    items: data.limit.map((stat) => ({
                      id: stat.id,
                      label: stat.stat_name,
                      value: stat.stat_value,
                    })),
                  },
                ]}
              />
            }
          >
            <QueryErrorBoundary fallback={<StatsLoading />}>
              <RaidStatsEditContainer
                raidId={raidId}
                effects={data.limit.map((stat) => ({
                  ...stat,
                  stat_value: stat.stat_value.toString(),
                }))}
                mode='LIMIT'
              />
            </QueryErrorBoundary>
          </RoleGate>
        </div>
      </div>
    </div>
  );
};

export default RaidDetail;
