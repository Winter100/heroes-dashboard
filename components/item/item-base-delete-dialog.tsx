import ConfirmDialog from '../common/confirm-dialog';
import { useAdminDeleteItem } from '@/hooks/item/use-admin-item';
import { Button } from '../ui/button';
import { useState } from 'react';

const ItemBaseDeleteDialog = ({ itemId }: { itemId: string }) => {
  const [open, setOpen] = useState(false);

  const { onDelete, isPending } = useAdminDeleteItem(itemId);

  const handleDelete = () => {
    void onDelete().then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title='삭제'
      description='해당 아이템을 삭제 하겠습니까?'
      trigger={<Button variant='destructive'>삭제</Button>}
      disabled={isPending}
      onSubmit={handleDelete}
      confirmLabel='네'
    />
  );
};

export default ItemBaseDeleteDialog;
