import { EquipmentStep } from '@/types/item-type';
import ItemStepEditForm from './item-step-edit-form';
import { ItemStepFormValues } from '@/schema/item.schema';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  useAdminDeleteStep,
  useAdminUpdateStep,
} from '@/hooks/item/use-admin-item';
import { toast } from '../ui/toast';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

type Props = {
  stats: { id: string; name: string }[];
  itemId: string;
  step: EquipmentStep;
};
const ItemDetailEditContainer = ({ stats, itemId, step }: Props) => {
  const [stepEditOpen, setStepEditOpen] = useState(false);
  const [stepDeleteOpen, setStepDeleteOpen] = useState(false);
  const updateStepMutation = useAdminUpdateStep(itemId);
  const deleteStepMutation = useAdminDeleteStep(itemId);

  const onEdit = (stepData: ItemStepFormValues) => {
    const promise = updateStepMutation.mutateAsync({
      stepId: step.id,
      itemId: itemId,
      steps: stepData,
    });

    toast.promise(promise, {
      loading: `${step.stepName} 변경 중...`,
      success: () => {
        setStepEditOpen(false);
        return `${step.stepName}가 변경되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '변경에 실패했습니다.',
    });
  };

  const onDelete = () => {
    const promise = deleteStepMutation.mutateAsync({
      stepId: step.id,
    });

    toast.promise(promise, {
      loading: `${step.stepName} 삭제 중...`,
      success: () => {
        setStepDeleteOpen(false);
        return `${step.stepName}가 삭제되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '삭제에 실패했습니다.',
    });
  };

  return (
    <div className='relative'>
      {!stepEditOpen && (
        <div className='absolute inset-0 flex justify-end bg-card/60'>
          <Button onClick={() => setStepEditOpen(true)} className='mr-2 mt-2'>
            수정
          </Button>

          <Dialog open={stepDeleteOpen} onOpenChange={setStepDeleteOpen}>
            <DialogTrigger
              render={
                <Button variant='destructive' className='mr-2 mt-2'>
                  삭제
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>강화 단계 {step.stepName}</DialogTitle>
                <DialogDescription className='text-red-300'>
                  해당 강화 수치를 삭제 하겠습니까?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant='outline'>취소</Button>} />
                <Button variant='destructive' onClick={onDelete}>
                  네
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div>
        <ItemStepEditForm
          stats={stats}
          defaultValues={step}
          disabled={updateStepMutation.isPending}
          mode='update'
          mutate={onEdit}
        />
      </div>
    </div>
  );
};

export default ItemDetailEditContainer;
