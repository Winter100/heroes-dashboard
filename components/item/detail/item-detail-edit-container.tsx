import { EquipmentStep } from '@/types/item-type';
import ItemStepEditForm from '../forms/item-step-edit-form';
import { Button } from '../../ui/button';
import { useAdminUpdateStep } from '@/hooks/item/use-admin-item';
import ItemDetailStepDeleteDialog from '../dialogs/item-detail-step-delete-dialog';
import { useState } from 'react';
import { ItemStepFormValues } from '@/schema/item.schema';

type Props = {
  stats: { id: string; name: string }[];
  itemId: string;
  step: EquipmentStep;
};
const ItemDetailEditContainer = ({ stats, itemId, step }: Props) => {
  const [open, setOpen] = useState(false);

  const { onEdit, isPending } = useAdminUpdateStep(itemId, step.id);

  const handleUpdate = (data: ItemStepFormValues) => {
    void onEdit(data).then(() => setOpen(false));
  };

  return (
    <div className='relative'>
      {!open && (
        <div className='absolute inset-0 flex justify-end bg-card/60'>
          <Button onClick={() => setOpen(true)} className='mr-2 mt-2'>
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
          disabled={isPending}
          mode='update'
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
};

export default ItemDetailEditContainer;
