'use client';

import { createItemFormData } from '@/lib/utils';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import ItemEditForm from './item-edit-form';
import { ItemFormValues } from '@/schema/item.schema';
import { useAdminCreateItem } from '@/hooks/item/use-admin-item';
import { toast } from '../ui/toast';
import { useNeedItemBasicId } from '@/hooks/item/use-item';
import { Skeleton } from '../ui/skeleton';

const ItemCreate = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const createItemMutation = useAdminCreateItem();
  const { isLoading, data } = useNeedItemBasicId(createOpen);

  const onCreate = (item: ItemFormValues) => {
    const formData = createItemFormData(item);
    const promise = createItemMutation.mutateAsync(formData);
    toast.promise(promise, {
      loading: `${item.name} 생성중...`,
      success: () => {
        setCreateOpen(false);
        return {
          type: 'success',
          title: item.name,
          description: `${item.name}가 생성되었습니다.`,
        };
      },
      error: (error) => {
        return {
          type: 'error',
          title: item.name,
          description:
            error instanceof Error
              ? error.message
              : '처리 중 오류가 발생했습니다.',
        };
      },
    });
  };

  if (isLoading)
    return (
      <Skeleton className='w-24 flex items-center justify-center h-10 bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground'>
        ...
      </Skeleton>
    );

  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogTrigger
        render={
          <Button className='w-24 h-10' variant='secondary'>
            아이템 생성
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {!isLoading && data ? (
          <ItemEditForm
            basicId={data}
            mode='create'
            mutate={onCreate}
            disabled={createItemMutation.isPending}
          />
        ) : (
          <div>잠시 후 다시 시도해주세요</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ItemCreate;
