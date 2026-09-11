import ActionDialog from '../common/action-dialog';
import { useAdminDeleteItem } from '@/hooks/item/use-admin-item';
import { Button } from '../ui/button';
import { DialogClose, DialogFooter } from '../ui/dialog';

const ItemBaseDeleteDialog = ({ itemId }: { itemId: string }) => {
  const { onDelete, deleteOpen, setDeleteOpen } = useAdminDeleteItem(itemId);

  return (
    <ActionDialog
      open={deleteOpen}
      setOpen={setDeleteOpen}
      title='삭제'
      description='해당 아이템을 삭제 하겠습니까?'
      trigger={<Button variant='destructive'>삭제</Button>}
    >
      <DialogFooter>
        <DialogClose render={<Button variant='outline'>취소</Button>} />
        <Button variant='destructive' onClick={onDelete}>
          네
        </Button>
      </DialogFooter>
    </ActionDialog>
  );
};

export default ItemBaseDeleteDialog;
