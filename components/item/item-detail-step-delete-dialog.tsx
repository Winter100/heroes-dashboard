import { useAdminDeleteStep } from '@/hooks/item/use-admin-item';
import { Button } from '../ui/button';
import ConfirmDialog from '../common/confirm-dialog';
import { useState } from 'react';
type Props = {
  itemId: string;
  stepId: string;
  stepName: string;
};
const ItemDetailStepDeleteDialog = ({ itemId, stepId, stepName }: Props) => {
  const [open, setOpen] = useState(false);
  const { onDelete, isPending } = useAdminDeleteStep(itemId, stepId);

  const handleDelete = () => {
    void onDelete().then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant='destructive' className='mr-2 mt-2'>
          삭제
        </Button>
      }
      title={`강화 단계 ${stepName}`}
      description='해당 강화 수치를 삭제 하겠습니까?'
      disabled={isPending}
      onSubmit={handleDelete}
      confirmLabel='네'
    />
  );
};

export default ItemDetailStepDeleteDialog;
