'use client';

import { revalidateApi } from '@/api/api';
import { ActionButton } from '../common/action-button';
import ActionDialog from '../common/action-dialog';
import { Button } from '../ui/button';

const EnchantRevalidate = () => {
  return (
    <ActionDialog
      trigger={<Button variant='secondary'>갱신</Button>}
      title='인챈트 갱신'
    >
      <ActionButton
        label='모든 인챈트 정보 갱신'
        onRequest={revalidateApi.enchant}
      />
    </ActionDialog>
  );
};

export default EnchantRevalidate;
