'use client';
import { Button } from '../ui/button';
import EnchantEditForm from './enchant-edit-form';
import { useAdminCreateEnchant } from '@/hooks/enchant/use-admin-enchant';
import ActionDialog from '../common/action-dialog';

const EnchantCreate = () => {
  const {
    onCreate,
    isPending: createPending,
    createOpen,
    setCreateOpen,
  } = useAdminCreateEnchant();

  return (
    <ActionDialog
      title='인챈트 생성'
      open={createOpen}
      setOpen={setCreateOpen}
      trigger={<Button variant='secondary'>인챈트 생성</Button>}
    >
      <EnchantEditForm
        mode='create'
        mutate={onCreate}
        disabled={createPending}
      />
    </ActionDialog>
  );
};

export default EnchantCreate;
