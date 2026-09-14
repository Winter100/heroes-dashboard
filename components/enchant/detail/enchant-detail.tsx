'use client';
import { useEnchantDetail } from '@/hooks/enchant/use-enchant';
import EnchantCard from '../card/enchant-card';
import EnchantDetailEditContainer from './enchant-detail-edit-container';
import EnchantEditDialog from '../dialogs/enchant-edit-dialog';
import EnchantDeleteDialog from '../dialogs/enchant-delete-dialog';
import QueryErrorBoundary from '../../common/query-error-boundary';
import LoadingSkeleton from '../../loading-skeleton';

const EnchantDetail = ({ enchantId }: { enchantId: string }) => {
  const { data } = useEnchantDetail(enchantId);

  return (
    <div className='gap-2 flex-col mx-auto flex items-center w-full'>
      <div className='mx-auto'>
        <EnchantEditDialog enchantId={enchantId} data={data} />
        <EnchantDeleteDialog enchantId={enchantId} />
      </div>
      <EnchantCard enchant={data} />
      <QueryErrorBoundary fallback={<LoadingSkeleton />}>
        <EnchantDetailEditContainer enchantId={enchantId} data={data} />
      </QueryErrorBoundary>
    </div>
  );
};

export default EnchantDetail;
