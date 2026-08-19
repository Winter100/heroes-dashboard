import { useState } from 'react';
import { Button } from '../ui/button';
import { toast } from '../ui/toast';
import EnchantDetailEditForm from './enchant-detail-edit-form';
import { useNeedItemBasicId, useStats } from '@/hooks/item/use-item';
import { EnchantType } from '@/types/enchant-type';
import { EnchantDetailFormValues } from '@/schema/enchant-schema';
import { useAdminUpsertEnchant } from '@/hooks/enchant/use-admin-enchant';
import LoadingSkeleton from '../loading-skeleton';

type Props = {
  enchantId: string;
  data: EnchantType;
};
const EnchantDetailEditContainer = ({ enchantId, data }: Props) => {
  const [stepEditOpen, setStepEditOpen] = useState(false);
  const upsertMutation = useAdminUpsertEnchant(enchantId);
  const { isLoading, data: stats } = useStats();
  const { isLoading: isBasicLoading, data: basic } = useNeedItemBasicId();

  if (isBasicLoading || isLoading) return <LoadingSkeleton />;

  const onEdit = (enchantData: EnchantDetailFormValues) => {
    if (!enchantData.effects.length && !enchantData.slotsId.length) return;
    const promise = upsertMutation.mutateAsync(enchantData);

    toast.promise(promise, {
      loading: `${data.name} 변경 중...`,
      success: () => {
        setStepEditOpen(false);
        return `${data.name}가 변경되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '변경에 실패했습니다.',
    });
  };

  return (
    <div className='relative max-w-sm w-full'>
      {!stepEditOpen && (
        <div className='absolute inset-0 flex justify-end bg-card/60'>
          <Button onClick={() => setStepEditOpen(true)} className='mr-2 mt-2'>
            수정
          </Button>
        </div>
      )}

      <div className='w-full'>
        <EnchantDetailEditForm
          stats={stats ?? []}
          slots={basic?.slot ?? []}
          defaultValues={{
            slotsId: data.enchantSlot,
            effects: data.effects,
          }}
          disabled={upsertMutation.isPending}
          mode='update'
          mutate={onEdit}
        />
      </div>
    </div>
  );
};

export default EnchantDetailEditContainer;
