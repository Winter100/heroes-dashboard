'use client';

import { useAdminDeleteRaid } from '@/hooks/raid/use-admin-raid';
import ConfirmDialog from '../common/confirm-dialog';
import { Button } from '../ui/button';
import { useState } from 'react';

type Props = {
  raidId: string;
  battle: string;
};
const RaidDeleteDialog = ({ raidId, battle }: Props) => {
  const { onDelete, isPending: deleteRaidPending } = useAdminDeleteRaid(raidId);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    void onDelete().then(
      () => setOpen(false),
      () => undefined,
    );
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title={battle}
      trigger={<Button variant='destructive'>삭제</Button>}
      description='해당 전투를 삭제 하겠습니까?'
      pending={deleteRaidPending}
      onConfirm={handleDelete}
      confirmLabel='네'
    />
  );
};

export default RaidDeleteDialog;
