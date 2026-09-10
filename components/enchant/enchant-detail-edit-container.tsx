import { Button } from '../ui/button';
import EnchantDetailEditForm from './enchant-detail-edit-form';
import { useNeedItemBasicId, useStats } from '@/hooks/item/use-item';
import { EnchantType } from '@/types/enchant-type';
import { useAdminUpsertEnchant } from '@/hooks/enchant/use-admin-enchant';
import LoadingSkeleton from '../loading-skeleton';

type Props = {
  enchantId: string;
  data: EnchantType;
};
const EnchantDetailEditContainer = ({ enchantId, data }: Props) => {
  const { onEdit, stepEditOpen, setStepEditOpen, isPending } =
    useAdminUpsertEnchant(enchantId);
  const { isLoading, data: stats } = useStats();
  const { isLoading: isBasicLoading, data: basic } =
    useNeedItemBasicId(stepEditOpen);

  if (isBasicLoading || isLoading) return <LoadingSkeleton />;

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
          disabled={isPending}
          mode='update'
          mutate={onEdit}
        />
      </div>
    </div>
  );
};

export default EnchantDetailEditContainer;
