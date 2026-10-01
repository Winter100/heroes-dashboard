'use client';

import { revalidateTags } from '@/constant/constant';
import ActionDialog from '../../common/action-dialog';
import { Button } from '../../ui/button';
import DetailRevalidateButton from '@/components/common/detail-revalidate-button';

const EnchantRevalidateDialog = () => {
  return (
    <ActionDialog
      trigger={<Button variant='secondary'>갱신</Button>}
      title='인챈트 갱신'
    >
      <DetailRevalidateButton
        resourceName='모든 인챈트 정보 갱신'
        tag={revalidateTags.enchantTable}
      />
    </ActionDialog>
  );
};

export default EnchantRevalidateDialog;
