'use client';
import { useItemDetail } from '@/hooks/item/use-item';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import QueryError from '../common/query-error';
import ItemCard from './item-card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ItemEditForm from './item-edit-form';
import { Button } from '../ui/button';
import { useState } from 'react';
import {
  useAdminDeleteItem,
  useAdminUpdateItem,
} from '@/hooks/item/use-admin-item';
import { ItemFormValues } from '@/schema/item.schema';
import { createItemFormData } from '@/lib/utils';
import { toast } from '../ui/toast';
import { useRouter } from 'next/navigation';

const ItemDetail = ({ itemId }: { itemId: string }) => {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { isLoading, data, error } = useItemDetail(itemId);
  const updateItemMutation = useAdminUpdateItem(itemId);
  const deleteItemMutation = useAdminDeleteItem(itemId);

  if (isLoading)
    return (
      <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 w-full'>
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={i} className='w-full max-w-sm'>
            <CardContent>
              <Skeleton className='h-72 w-full' />
            </CardContent>
          </Card>
        ))}
      </div>
    );

  if (error) return <QueryError error={error} />;

  if (!data) {
    return (
      <Card className='w-full'>
        <CardContent className='flex items-center justify-center gap-2 h-72'>
          <p>아이템을 찾지 못했습니다.</p>
        </CardContent>
      </Card>
    );
  }

  const onEdit = (itemData: ItemFormValues) => {
    const formData = createItemFormData(itemData);

    const promise = updateItemMutation.mutateAsync({ formData, itemId });

    toast.promise(promise, {
      loading: `${itemData.name} 수정 중...`,
      success: () => {
        setEditOpen(false);
        return `${itemData.name}가 수정되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '수정에 실패했습니다.',
    });
  };

  const onDelete = () => {
    const promise = deleteItemMutation.mutateAsync();

    toast.promise(promise, {
      loading: `${data.name} 삭제 중...`,
      success: () => {
        setDeleteOpen(false);
        router.back();
        return `${data.name}가 삭제되었습니다.`;
      },
      error: (error) =>
        error instanceof Error ? error.message : '삭제에 실패했습니다.',
    });
  };

  return (
    <div className='gap-2 flex-col mx-auto flex items-center'>
      <div className='mx-auto'>
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger render={<Button variant='secondary'>수정</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <ItemEditForm
              defaultValues={data}
              mode='update'
              mutate={onEdit}
              disabled={updateItemMutation.isPending}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger render={<Button variant='destructive'>삭제</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{data.name}</DialogTitle>
              <DialogDescription className='text-red-300'>
                해당 아이템을 삭제 하겠습니까?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant='outline'>취소</Button>} />
              <Button variant='destructive' onClick={onDelete}>
                네
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ItemCard item={data} />

      <div>
        {data.category.id === 1 &&
          data.equipmentStep?.map((step) => (
            <div key={step.id}>
              {step.stepName} {data.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemDetail;
