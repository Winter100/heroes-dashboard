'use client';

import { Button } from '../../ui/button';
import { useAdminCreateItem } from '@/hooks/item/use-admin-item';
import { Skeleton } from '../../ui/skeleton';
import ItemEditContent from '../forms/item-edit-content';
import QueryErrorBoundary from '../../common/query-error-boundary';
import { useState } from 'react';
import ConfirmDialog from '../../common/confirm-dialog';
import { ItemFormValues } from '@/schema/item.schema';

const ItemCreateDialog = () => {
  const [open, setOpen] = useState(false);

  const { isPending, onCreate } = useAdminCreateItem();

  const handleCreate = (item: ItemFormValues) => {
    void onCreate(item).then(() => setOpen(false));
  };
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title='아이템 생성'
      trigger={<Button variant='secondary'>아이템 생성</Button>}
      formId={formId}
      confirmLabel='생성'
    >
      <QueryErrorBoundary
        fallback={
          <Skeleton className='w-24 flex items-center justify-center h-10 bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground'>
            ...
          </Skeleton>
        }
      >
        <ItemEditContent
          mode='create'
          onSubmit={handleCreate}
          disabled={isPending}
          formId={formId}
        />
      </QueryErrorBoundary>
    </ConfirmDialog>
  );
};

export default ItemCreateDialog;

const formId = 'create-item';
