'use client';

import { revalidateTags } from '@/constant/constant';
import ActionDialog from '../../common/action-dialog';
import { Button } from '../../ui/button';
import DetailRevalidateButton from '@/components/common/detail-revalidate-button';

const RaidRevalidateDialog = () => {
  return (
    <ActionDialog
      trigger={<Button variant='secondary'>갱신</Button>}
      title='레이드 갱신'
    >
      <DetailRevalidateButton
        resourceName='모든 레이드 갱신'
        tag={revalidateTags.raid}
      />
    </ActionDialog>
  );
};

export default RaidRevalidateDialog;
