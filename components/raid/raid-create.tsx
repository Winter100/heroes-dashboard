'use client';

import { Button } from '../ui/button';
import { useAdminCreateRaid } from '@/hooks/raid/use-admin-raid';
import RaidEditForm from './raid-edit-form';
import ActionDialog from '../common/action-dialog';

const RaidCreate = () => {
  const {
    createOpen,
    setCreateOpen,
    onCreate,
    isPending: createRaidPending,
  } = useAdminCreateRaid();

  return (
    <ActionDialog
      open={createOpen}
      setOpen={setCreateOpen}
      title='레이드 생성'
      trigger={<Button variant='secondary'>레이드 생성</Button>}
    >
      <RaidEditForm
        mode='create'
        mutate={onCreate}
        disabled={createRaidPending}
      />
    </ActionDialog>
  );
};

export default RaidCreate;
