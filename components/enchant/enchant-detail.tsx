'use client';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import QueryError from '../common/query-error';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import EnchantEditForm from './enchant-edit-form';
import {
  useAdminDeleteEnchant,
  useAdminUpdateEnchant,
} from '@/hooks/enchant/use-admin-enchant';
import { useEnchantDetail } from '@/hooks/enchant/use-enchant';
import EnchantCard from './enchant-card';
import EnchantDetailEditContainer from './enchant-detail-edit-container';
import ActionDialog from '../common/action-dialog';

const EnchantDetail = ({ enchantId }: { enchantId: string }) => {
  const { isLoading, data, error } = useEnchantDetail(enchantId);

  const {
    onEdit,
    isPending: updatePending,
    editOpen,
    setEditOpen,
  } = useAdminUpdateEnchant(enchantId);

  const {
    onDelete,
    isPending: deletePending,
    deleteOpen,
    setDeleteOpen,
  } = useAdminDeleteEnchant(enchantId);

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

  return (
    <div className='gap-2 flex-col mx-auto flex items-center w-full'>
      <div className='mx-auto'>
        <ActionDialog
          open={editOpen}
          setOpen={setEditOpen}
          trigger={<Button variant='secondary'>수정</Button>}
          title='인챈트 수정'
        >
          <EnchantEditForm
            defaultValues={data}
            mode='update'
            mutate={onEdit}
            disabled={updatePending}
          />
        </ActionDialog>

        <ActionDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          trigger={<Button variant='destructive'>삭제</Button>}
          title='인챈트 삭제'
          description='해당 아이템을 삭제 하겠습니까?'
        >
          <DialogFooter>
            <DialogClose render={<Button variant='outline'>취소</Button>} />
            <Button
              variant='destructive'
              onClick={() => onDelete()}
              disabled={deletePending}
            >
              네
            </Button>
          </DialogFooter>
        </ActionDialog>
      </div>

      <EnchantCard enchant={data} />

      <EnchantDetailEditContainer enchantId={enchantId} data={data} />
    </div>
  );
};

export default EnchantDetail;
