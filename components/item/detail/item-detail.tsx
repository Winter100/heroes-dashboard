'use client';
import { useItemDetail, useStats } from '@/hooks/item/use-item';
import { useAdminCreateStep } from '@/hooks/item/use-admin-item';
import ItemStepEditForm from '../forms/item-step-edit-form';
import ItemDetailEditContainer from './item-detail-edit-container';
import ItemBaseUpdateDialog from '../dialogs/item-base-update-dialog';
import ItemBaseDeleteDialog from '../dialogs/item-base-delete-dialog';
import ItemCard from '../card/item-card';
import { ADMIN_ROLES, RoleGate } from '@/components/auth/role-gate';
import DetailInfoCard from '@/components/common/detail-info-card';
import type { ItemStepType } from '@/types/item-type';
import DetailRevalidateButton from '@/components/common/detail-revalidate-button';
import { revalidateTags } from '@/constant/constant';

const ItemAdminStepControls = ({ item }: { item: ItemStepType }) => {
  const { onCreateStep, isPending } = useAdminCreateStep(item.id.toString());
  const stats = useStats();

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2 w-full'>
      {item.steps?.map((step) => (
        <ItemDetailEditContainer
          key={step.id}
          itemId={item.id.toString()}
          stats={stats?.data ?? []}
          step={step}
        />
      ))}

      <ItemStepEditForm
        stats={stats?.data ?? []}
        disabled={isPending}
        mode='create'
        onSubmit={onCreateStep}
      />
    </div>
  );
};

const ItemDetail = ({ itemId }: { itemId: string }) => {
  const { data } = useItemDetail(itemId);

  return (
    <div className='gap-2 flex-col mx-auto flex items-center'>
      <RoleGate allowedRoles={ADMIN_ROLES}>
        <div className='mx-auto flex items-center gap-2'>
          {/* 베이스 아이템 정보 수정 Dialog */}
          <ItemBaseUpdateDialog itemId={itemId} data={data} />

          {/* 베이스 아이템 정보 삭제 Dialog */}
          <ItemBaseDeleteDialog itemId={itemId} />

          <DetailRevalidateButton
            id={itemId}
            resourceName='아이템 갱신'
            tag={revalidateTags.recipes}
          />
        </div>
      </RoleGate>

      {/* 베이스 아이템 카드 */}
      <ItemCard item={data} />

      {/* 장비 아이템 강화별 수치 수정 폼 */}
      {data.category.id === 1 && (
        <RoleGate
          allowedRoles={ADMIN_ROLES}
          fallback={
            <div className='grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2 w-full'>
              {data.steps && data.steps.length > 0 ? (
                data.steps.map((step) => (
                  <DetailInfoCard
                    key={step.id}
                    title={step.stepName}
                    sections={[
                      {
                        title: '스탯 효과',
                        items: step.effects.map((effect) => ({
                          id: effect.stat_id,
                          label: effect.name,
                          value: effect.stat_value,
                        })),
                      },
                    ]}
                  />
                ))
              ) : (
                <DetailInfoCard
                  title='강화 단계'
                  sections={[{ title: '스탯 효과', items: [] }]}
                />
              )}
            </div>
          }
        >
          <ItemAdminStepControls item={data} />
        </RoleGate>
      )}
    </div>
  );
};

export default ItemDetail;
