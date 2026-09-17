import { BossStat } from '@/types/raid-type';
import { useAdminUpsertRaidDetail } from '@/hooks/raid/use-admin-raid';
import { useStats } from '@/hooks/item/use-item';
import { useState } from 'react';
import { RaidEffectsFormValues } from '@/schema/raid-schema';
import { Button } from '@/components/ui/button';
import RaidDetailEditForm from '../forms/raid-detail-edit-form';

type Props = {
  mode: 'ENTRY' | 'LIMIT';
  effects: BossStat[];
  raidId: string;
};
const RaidStatsEditContainer = ({ effects, mode, raidId }: Props) => {
  const [open, setOpen] = useState(false);

  const { onUpsert, isPending } = useAdminUpsertRaidDetail(raidId);

  const { data: statsFormData } = useStats();

  const handleUpdate = (boss: RaidEffectsFormValues) => {
    void onUpsert(mode, boss).then(() => setOpen(false));
  };

  return (
    <div className='relative'>
      {!open && (
        <div className='absolute inset-0 flex justify-end bg-card/60'>
          <Button onClick={() => setOpen(true)} className='mr-2 mt-2'>
            수정
          </Button>
        </div>
      )}

      <div className='w-full max-w-lg'>
        <RaidDetailEditForm
          stats={statsFormData}
          defaultValues={{ effects }}
          disabled={isPending}
          mode={mode}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
};

export default RaidStatsEditContainer;
