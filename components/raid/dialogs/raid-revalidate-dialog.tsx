'use client';

import { revalidateApi } from '@/api/api';
import { ActionButton } from '../../common/action-button';
import ActionDialog from '../../common/action-dialog';
import { Button } from '../../ui/button';

const RaidRevalidateDialog = () => {
  return (
    <ActionDialog
      trigger={<Button variant='secondary'>갱신</Button>}
      title='레이드 갱신'
    >
      <ActionButton label='모든 레이드 갱신' onRequest={revalidateApi.raid} />
    </ActionDialog>
  );
};

export default RaidRevalidateDialog;
