import { useAdminUpdateItem } from '@/hooks/item/use-admin-item';
import { Button } from '../../ui/button';
import { ItemStepType } from '@/types/item-type';
import ItemEditContent from '../forms/item-edit-content';
import QueryErrorBoundary from '../../common/query-error-boundary';
import { Skeleton } from '../../ui/skeleton';
import { useState } from 'react';
import ConfirmDialog from '../../common/confirm-dialog';
import { ItemFormValues } from '@/schema/item.schema';

type Props = {
  itemId: string;
  data: ItemStepType;
};

const ItemBaseUpdateDialog = ({ itemId, data }: Props) => {
  const [open, setOpen] = useState(false);

  const { onEdit, isPending } = useAdminUpdateItem(itemId);

  const handleUpdate = (data: ItemFormValues) => {
    void onEdit(data).then(() => setOpen(false));
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title='아이템 기본 정보 수정'
      trigger={<Button variant='secondary'>수정</Button>}
      formId={formId}
      confirmLabel='수정'
    >
      <QueryErrorBoundary
        fallback={
          <Skeleton className='w-24 flex items-center justify-center h-10 bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground'>
            ...
          </Skeleton>
        }
      >
        <ItemEditContent
          mode='update'
          data={data}
          disabled={isPending}
          onSubmit={handleUpdate}
          formId={formId}
        />
      </QueryErrorBoundary>
    </ConfirmDialog>
  );
};

export default ItemBaseUpdateDialog;

const formId = 'update-item';
