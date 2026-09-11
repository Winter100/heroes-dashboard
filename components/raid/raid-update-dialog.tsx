import { useAdminUpdateRaid } from '@/hooks/raid/use-admin-raid';
import ActionDialog from '../common/action-dialog';
import RaidEditForm from './raid-edit-form';
import { RaidType } from '@/types/raid-type';
import { Button } from '../ui/button';

type Props = {
  raidId: string;
  data?: RaidType;
};

const RaidUpdateDialog = ({ raidId, data }: Props) => {
  const {
    editOpen,
    setEditOpen,
    onEdit,
    isPending: updateRaidPending,
  } = useAdminUpdateRaid(raidId);

  return (
    <ActionDialog
      open={editOpen}
      setOpen={setEditOpen}
      title='레이드 기본 정보 수정'
      trigger={<Button variant='secondary'>수정</Button>}
    >
      <RaidEditForm
        defaultValues={data}
        mode='update'
        mutate={onEdit}
        disabled={updateRaidPending}
      />
    </ActionDialog>
  );
};

export default RaidUpdateDialog;
