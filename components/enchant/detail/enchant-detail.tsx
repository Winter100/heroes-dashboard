'use client';
import { useEnchantDetail } from '@/hooks/enchant/use-enchant';
import EnchantCard from '../card/enchant-card';
import EnchantDetailEditContainer from './enchant-detail-edit-container';
import EnchantEditDialog from '../dialogs/enchant-edit-dialog';
import EnchantDeleteDialog from '../dialogs/enchant-delete-dialog';
import QueryErrorBoundary from '../../common/query-error-boundary';
import LoadingSkeleton from '../../loading-skeleton';
import { ADMIN_ROLES, RoleGate } from '@/components/auth/role-gate';
import DetailInfoCard from '@/components/common/detail-info-card';
import DetailRevalidateButton from '@/components/common/detail-revalidate-button';
import { revalidateTags } from '@/constant/constant';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const EnchantDetail = ({ enchantId }: { enchantId: string }) => {
  const { data } = useEnchantDetail(enchantId);

  return (
    <div className='gap-2 flex-col mx-auto  flex items-center w-full'>
      <RoleGate allowedRoles={ADMIN_ROLES}>
        <div className='mx-auto flex items-center gap-2'>
          <EnchantEditDialog enchantId={enchantId} data={data} />
          <EnchantDeleteDialog enchantId={enchantId} />
          <DetailRevalidateButton
            id={data.name}
            resourceName='인챈트 갱신'
            tag={revalidateTags.enchantDetail}
          />
          <Link
            href={`/dashboard/enchant/drop/${encodeURIComponent(enchantId)}`}
            className={buttonVariants({ variant: 'outline' })}
          >
            드랍
          </Link>
        </div>
      </RoleGate>
      <EnchantCard enchant={data} />
      <RoleGate
        allowedRoles={ADMIN_ROLES}
        fallback={
          <DetailInfoCard
            title='인챈트 상세'
            sections={[
              {
                title: '적용 가능 부위',
                items: data.slot.map((slot) => ({
                  id: slot.id,
                  label: slot.name,
                  value: slot.value,
                })),
              },
              {
                title: '스탯 효과',
                items: data.effects.map((effect) => ({
                  id: effect.id,
                  label: effect.stat_name,
                  value: effect.stat_value,
                })),
              },
            ]}
          />
        }
      >
        <QueryErrorBoundary fallback={<LoadingSkeleton />}>
          <EnchantDetailEditContainer enchantId={enchantId} data={data} />
        </QueryErrorBoundary>
      </RoleGate>
    </div>
  );
};

export default EnchantDetail;
