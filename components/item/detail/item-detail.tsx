'use client';
import { useItemDetail, useStats } from '@/hooks/item/use-item';
import { useAdminCreateStep } from '@/hooks/item/use-admin-item';
import ItemStepEditForm from '../forms/item-step-edit-form';
import ItemDetailEditContainer from './item-detail-edit-container';
import ItemBaseUpdateDialog from '../dialogs/item-base-update-dialog';
import ItemBaseDeleteDialog from '../dialogs/item-base-delete-dialog';
import ItemCard from '../card/item-card';

const ItemDetail = ({ itemId }: { itemId: string }) => {
  const { data } = useItemDetail(itemId);

  const { onCreateStep, isPending } = useAdminCreateStep(itemId);

  const stats = useStats();

  return (
    <div className='gap-2 flex-col mx-auto flex items-center'>
      <div className='mx-auto'>
        {/* 베이스 아이템 정보 수정 Dialog */}
        <ItemBaseUpdateDialog itemId={itemId} data={data} />

        {/* 베이스 아이템 정보 삭제 Dialog */}
        <ItemBaseDeleteDialog itemId={itemId} />
      </div>

      {/* 베이스 아이템 카드 */}
      <ItemCard item={data} />

      {/* 장비 아이템 강화별 수치 수정 폼 */}
      {data.category.id === 1 && (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2 w-full'>
          {data.steps?.map((step) => (
            <ItemDetailEditContainer
              key={step.id}
              itemId={data.id.toString()}
              stats={stats?.data ?? []}
              step={step}
            />
          ))}

          {/* 장비 아이템 강화별 수치 등록 폼 */}
          <ItemStepEditForm
            stats={stats?.data ?? []}
            disabled={isPending}
            mode='create'
            onSubmit={onCreateStep}
          />
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
