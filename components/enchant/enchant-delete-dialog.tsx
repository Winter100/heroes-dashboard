import { useAdminDeleteEnchant } from '@/hooks/enchant/use-admin-enchant';
import ConfirmDialog from '../common/confirm-dialog';
import { Button } from '../ui/button';
import { useState } from 'react';

type Props = {
  enchantId: string;
};

const EnchantDeleteDialog = ({ enchantId }: Props) => {
  const { onDelete, isPending: deletePending } =
    useAdminDeleteEnchant(enchantId);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    void onDelete().then(
      () => setOpen(false),
      () => undefined,
    );
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant='destructive'>삭제</Button>}
      title='인챈트 삭제'
      description='해당 아이템을 삭제 하겠습니까?'
      pending={deletePending}
      onConfirm={handleDelete}
      confirmLabel='네'
    />
  );
};

export default EnchantDeleteDialog;
