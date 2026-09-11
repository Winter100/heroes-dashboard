'use client';

import { Button } from '../ui/button';
import { useAdminCreateItem } from '@/hooks/item/use-admin-item';
import { Skeleton } from '../ui/skeleton';
import ActionDialog from '../common/action-dialog';
import ItemEditContent from './item-edit-content';
import QueryErrorBoundary from '../common/query-error-boundary';

const ItemCreate = () => {
  const {
    createOpen,
    isPending: createItemPending,
    setCreateOpen,
    onCreate,
  } = useAdminCreateItem();
  return (
    <ActionDialog
      open={createOpen}
      setOpen={setCreateOpen}
      title='아이템 생성'
      trigger={<Button variant='secondary'>아이템 생성</Button>}
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
          mutate={onCreate}
          isPending={createItemPending}
        />
      </QueryErrorBoundary>
    </ActionDialog>
  );
};

export default ItemCreate;
