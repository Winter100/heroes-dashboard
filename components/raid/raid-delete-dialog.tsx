'use client';

import { useAdminDeleteRaid } from '@/hooks/raid/use-admin-raid';
import ActionDialog from '../common/action-dialog';
import { Button } from '../ui/button';
import { DialogClose, DialogFooter } from '../ui/dialog';

type Props = {
  raidId: string;
  battle: string;
};
const RaidDeleteDialog = ({ raidId, battle }: Props) => {
  const {
    deleteOpen,
    setDeleteOpen,
    onDelete,
    isPending: deleteRaidPending,
  } = useAdminDeleteRaid(raidId);

  return (
    <ActionDialog
      open={deleteOpen}
      setOpen={setDeleteOpen}
      title={battle}
      trigger={<Button variant='destructive'>삭제</Button>}
      description='해당 전투를 삭제 하겠습니까?'
    >
      <DialogFooter>
        <DialogClose render={<Button variant='outline'>취소</Button>} />
        <Button
          disabled={deleteRaidPending}
          variant='destructive'
          onClick={onDelete}
        >
          네
        </Button>
      </DialogFooter>
    </ActionDialog>
  );
};

export default RaidDeleteDialog;
