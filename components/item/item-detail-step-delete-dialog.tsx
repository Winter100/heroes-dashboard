import { useAdminDeleteStep } from '@/hooks/item/use-admin-item';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import ActionDialog from '../common/action-dialog';
type Props = {
  itemId: string;
  stepId: string;
  stepName: string;
};
const ItemDetailStepDeleteDialog = ({ itemId, stepId, stepName }: Props) => {
  const { stepDeleteOpen, setStepDeleteOpen, onDelete } = useAdminDeleteStep(
    itemId,
    stepId,
  );
  return (
    <ActionDialog
      open={stepDeleteOpen}
      setOpen={setStepDeleteOpen}
      trigger={
        <Button variant='destructive' className='mr-2 mt-2'>
          삭제
        </Button>
      }
      title={`강화 단계 ${stepName}`}
      description='해당 강화 수치를 삭제 하겠습니까?'
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

export default ItemDetailStepDeleteDialog;
