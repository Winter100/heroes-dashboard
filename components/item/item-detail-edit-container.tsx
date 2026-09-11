import { EquipmentStep } from '@/types/item-type';
import ItemStepEditForm from './item-step-edit-form';
import { Button } from '../ui/button';
import { useAdminUpdateStep } from '@/hooks/item/use-admin-item';
import ItemDetailStepDeleteDialog from './item-detail-step-delete-dialog';

type Props = {
  stats: { id: string; name: string }[];
  itemId: string;
  step: EquipmentStep;
};
const ItemDetailEditContainer = ({ stats, itemId, step }: Props) => {
  const {
    stepEditOpen,
    setStepEditOpen,
    onEdit,
    isPending: updateStepPending,
  } = useAdminUpdateStep(itemId, step.id);

  return (
    <div className='relative'>
      {!stepEditOpen && (
        <div className='absolute inset-0 flex justify-end bg-card/60'>
          <Button onClick={() => setStepEditOpen(true)} className='mr-2 mt-2'>
            수정
          </Button>

          {/* 스텝 삭제 Dialog */}
          <ItemDetailStepDeleteDialog
            itemId={itemId}
            stepId={step.id}
            stepName={step.stepName}
          />
        </div>
      )}

      <div>
        {/* 스텝 수정 폼*/}
        <ItemStepEditForm
          stats={stats}
          defaultValues={step}
          disabled={updateStepPending}
          mode='update'
          mutate={onEdit}
        />
      </div>
    </div>
  );
};

export default ItemDetailEditContainer;
