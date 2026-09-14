import { useAdminUpdateRaid } from '@/hooks/raid/use-admin-raid';
import RaidEditForm from './raid-edit-form';
import { RaidType } from '@/types/raid-type';
import { Button } from '../ui/button';
import { useState } from 'react';
import ConfirmDialog from '../common/confirm-dialog';
import { RaidFormValues } from '@/schema/raid-schema';

type Props = {
  raidId: string;
  data?: RaidType;
};

const RaidUpdateDialog = ({ raidId, data }: Props) => {
  const [open, setOpen] = useState(false);

  const { onEdit, isPending } = useAdminUpdateRaid(raidId);

  const handleUpdate = (data: RaidFormValues) => {
    void onEdit(data).then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title='레이드 기본 정보 수정'
      trigger={<Button variant='secondary'>수정</Button>}
      formId={formId}
      confirmLabel='수정'
    >
      <RaidEditForm
        defaultValues={data}
        mode='update'
        onSubmit={handleUpdate}
        disabled={isPending}
        formId={formId}
      />
    </ConfirmDialog>
  );
};

export default RaidUpdateDialog;

const formId = 'update-raid';
