'use client';

import { Button } from '../../ui/button';
import { useAdminCreateRaid } from '@/hooks/raid/use-admin-raid';
import RaidEditForm from '../forms/raid-edit-form';
import { useState } from 'react';
import ConfirmDialog from '../../common/confirm-dialog';
import { RaidFormValues } from '@/schema/raid-schema';

const RaidCreateDialog = () => {
  const [open, setOpen] = useState(false);

  const { onCreate, isPending } = useAdminCreateRaid();

  const handleCreate = (data: RaidFormValues) => {
    void onCreate(data).then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title='레이드 생성'
      trigger={<Button variant='secondary'>레이드 생성</Button>}
      confirmLabel='생성'
      formId={formId}
    >
      <RaidEditForm
        mode='create'
        onSubmit={handleCreate}
        disabled={isPending}
        formId={formId}
      />
    </ConfirmDialog>
  );
};

export default RaidCreateDialog;

const formId = 'create-raid';
