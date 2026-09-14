'use client';
import { Button } from '../ui/button';
import EnchantEditForm from './enchant-edit-form';
import { useAdminCreateEnchant } from '@/hooks/enchant/use-admin-enchant';
import { useState } from 'react';
import ConfirmDialog from '../common/confirm-dialog';
import { EnchantFormValues } from '@/schema/enchant-schema';

const EnchantCreate = () => {
  const [open, setOpen] = useState(false);

  const { onCreate, isPending } = useAdminCreateEnchant();

  const handleCreate = (enchantData: EnchantFormValues) => {
    void onCreate(enchantData).then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      title='인챈트 생성'
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant='secondary'>인챈트 생성</Button>}
      formId={formId}
      disabled={isPending}
      confirmLabel='생성'
    >
      <EnchantEditForm
        mode='create'
        onSubmit={handleCreate}
        disabled={isPending}
        formId={formId}
      />
    </ConfirmDialog>
  );
};

export default EnchantCreate;

const formId = 'create-enchant';
