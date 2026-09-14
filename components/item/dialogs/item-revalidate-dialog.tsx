'use client';

import { revalidateApi } from '@/api/api';
import { ActionButton } from '../../common/action-button';
import ActionDialog from '../../common/action-dialog';
import { Button } from '../../ui/button';

const ItemRevalidateDialog = () => {
  return (
    <ActionDialog
      trigger={<Button variant='secondary'>갱신</Button>}
      title='아이템 갱신'
    >
      <ActionButton
        label='아이템 세트 옵션 갱신'
        onRequest={revalidateApi.itemSetOption}
      />
    </ActionDialog>
  );
};

export default ItemRevalidateDialog;
