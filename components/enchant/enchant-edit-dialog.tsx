import { useAdminUpdateEnchant } from '@/hooks/enchant/use-admin-enchant';
import { Button } from '../ui/button';
import EnchantEditForm from './enchant-edit-form';
import { EnchantType } from '@/types/enchant-type';
import { useState } from 'react';
import { EnchantFormValues } from '@/schema/enchant-schema';
import ConfirmDialog from '../common/confirm-dialog';

type Props = {
  enchantId: string;
  data?: EnchantType;
};

const EnchantEditDialog = ({ enchantId, data }: Props) => {
  const [open, setOpen] = useState(false);

  const { onEdit, isPending } = useAdminUpdateEnchant(enchantId);

  const handleUpdate = (enchantData: EnchantFormValues) => {
    void onEdit(enchantData).then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant='secondary'>수정</Button>}
      title='인챈트 수정'
      formId={formId}
      confirmLabel='수정'
    >
      <EnchantEditForm
        formId={formId}
        defaultValues={data}
        mode='update'
        onSubmit={handleUpdate}
        disabled={isPending}
      />
    </ConfirmDialog>
  );
};

export default EnchantEditDialog;

const formId = 'update-enchant';
