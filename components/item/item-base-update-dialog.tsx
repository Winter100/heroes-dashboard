import ActionDialog from '../common/action-dialog';
import { useAdminUpdateItem } from '@/hooks/item/use-admin-item';
import { Button } from '../ui/button';
import { ItemStepType } from '@/types/item-type';
import ItemEditContent from './item-edit-content';
import QueryErrorBoundary from '../common/query-error-boundary';
import { Skeleton } from '../ui/skeleton';

type Props = {
  itemId: string;
  data: ItemStepType;
};

const ItemBaseUpdateDialog = ({ itemId, data }: Props) => {
  const {
    onEdit,
    editOpen,
    setEditOpen,
    isPending: updateItemPending,
  } = useAdminUpdateItem(itemId);

  return (
    <ActionDialog
      open={editOpen}
      setOpen={setEditOpen}
      title='아이템 기본 정보 수정'
      trigger={<Button variant='secondary'>수정</Button>}
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
          isPending={updateItemPending}
          mutate={onEdit}
        />
      </QueryErrorBoundary>
    </ActionDialog>
  );
};

export default ItemBaseUpdateDialog;
