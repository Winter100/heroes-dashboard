'use client';
import { useEnchantDetail } from '@/hooks/enchant/use-enchant';
import EnchantCard from './enchant-card';
import EnchantDetailEditContainer from './enchant-detail-edit-container';
import EnchantEditDialog from './enchant-edit-dialog';
import EnchantDeleteDialog from './enchant-delete-dialog';

const EnchantDetail = ({ enchantId }: { enchantId: string }) => {
  const { data } = useEnchantDetail(enchantId);

  return (
    <div className='gap-2 flex-col mx-auto flex items-center w-full'>
      <div className='mx-auto'>
        <EnchantEditDialog enchantId={enchantId} data={data} />
        <EnchantDeleteDialog enchantId={enchantId} />
      </div>
      <EnchantCard enchant={data} />
      <EnchantDetailEditContainer enchantId={enchantId} data={data} />
    </div>
  );
};

export default EnchantDetail;
