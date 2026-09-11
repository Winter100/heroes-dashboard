import { Button } from '../ui/button';
import EnchantDetailEditForm from './enchant-detail-edit-form';
import { useItemPageData } from '@/hooks/item/use-item';
import { EnchantType } from '@/types/enchant-type';
import { useAdminUpsertEnchant } from '@/hooks/enchant/use-admin-enchant';

type Props = {
  enchantId: string;
  data: EnchantType;
};
const EnchantDetailEditContainer = ({ enchantId, data }: Props) => {
  const { onEdit, stepEditOpen, setStepEditOpen, isPending } =
    useAdminUpsertEnchant(enchantId);

  const { stats, basicId } = useItemPageData();

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
          slots={basicId?.slot ?? []}
          defaultValues={{
            slotsId: data.slot.map((s) => ({ slotId: s.id })),
            effects: data.effects.map((e) => ({
              statId: e.id,
              value: e.stat_value,
            })),
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
