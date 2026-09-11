import { Button } from '../ui/button';
import RaidDetailEditForm from './raid-detail-edit-form';
import { BossStat } from '@/types/raid-type';
import { useAdminUpsertRaidDetail } from '@/hooks/raid/use-admin-raid';
import { useStats } from '@/hooks/item/use-item';

type Props = {
  mode: 'ENTRY' | 'LIMIT';
  effects: BossStat[];
  raidId: string;
};
const RaidStatsEditContainer = ({ effects, mode, raidId }: Props) => {
  const {
    onUpsert,
    isPending: upsertRaidPending,
    stepEditOpen,
    setStepEditOpen,
  } = useAdminUpsertRaidDetail(raidId);

  const { data: statsFormData } = useStats();

  return (
    <div className='relative'>
      {!stepEditOpen && (
        <div className='absolute inset-0 flex justify-end bg-card/60'>
          <Button onClick={() => setStepEditOpen(true)} className='mr-2 mt-2'>
            수정
          </Button>
        </div>
      )}

      <div className='w-full max-w-lg'>
        <RaidDetailEditForm
          stats={statsFormData}
          defaultValues={{ effects }}
          disabled={upsertRaidPending}
          mode={mode}
          mutate={onUpsert}
        />
      </div>
    </div>
  );
};

export default RaidStatsEditContainer;
