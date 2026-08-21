import { useState } from 'react';
import { Button } from '../ui/button';
import RaidDetailEditForm from './raid-detail-edit-form';
import { BossStat } from '@/types/raid-type';
import { RaidEffectsFormValues } from '@/schema/raid-schema';

type Props = {
  mode: 'ENTRY' | 'LIMIT';
  effects: BossStat[];
  raidId: string;
  stats: {
    id: string;
    name: string;
  }[];
  onEdit: (mode: string, effects: RaidEffectsFormValues) => void;
  disabled: boolean;
};
const RaidStatsEditContainer = ({
  effects,
  mode,
  stats,
  onEdit,
  disabled,
}: Props) => {
  const [stepEditOpen, setStepEditOpen] = useState(false);

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
          stats={stats}
          defaultValues={{ effects }}
          disabled={disabled}
          mode={mode}
          mutate={onEdit}
        />
      </div>
    </div>
  );
};

export default RaidStatsEditContainer;
