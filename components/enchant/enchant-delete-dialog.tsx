import { useAdminDeleteEnchant } from '@/hooks/enchant/use-admin-enchant';
import ActionDialog from '../common/action-dialog';
import { Button } from '../ui/button';
import { DialogClose, DialogFooter } from '../ui/dialog';

type Props = {
  enchantId: string;
};

const EnchantDeleteDialog = ({ enchantId }: Props) => {
  const {
    onDelete,
    isPending: deletePending,
    deleteOpen,
    setDeleteOpen,
  } = useAdminDeleteEnchant(enchantId);

  return (
    <ActionDialog
      open={deleteOpen}
      setOpen={setDeleteOpen}
      trigger={<Button variant='destructive'>삭제</Button>}
      title='인챈트 삭제'
      description='해당 아이템을 삭제 하겠습니까?'
    >
      <DialogFooter>
        <DialogClose render={<Button variant='outline'>취소</Button>} />
        <Button
          variant='destructive'
          onClick={() => onDelete()}
          disabled={deletePending}
        >
          네
        </Button>
      </DialogFooter>
    </ActionDialog>
  );
};

export default EnchantDeleteDialog;
